using Application.Core;
using Application.Interfaces;
using Domanin;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>        
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activitiy = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activitiy == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var hostUsername = activitiy.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activitiy.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                    activitiy.IsCancelled = !activitiy.IsCancelled;
                if (attendance != null && hostUsername != user.UserName)
                    activitiy.Attendees.Remove(attendance);
                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activitiy,
                        IsHost = false
                    };

                    activitiy.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result 
                    ? Result<Unit>.Success(Unit.Value) 
                    : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}