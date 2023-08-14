using AutoMapper;
using TaskManager.Model.Domain;
using TaskManager.Model.DTO;

namespace TaskManager.Data
{
    public class Mapper : Profile 
    {
        public Mapper()
        {
            CreateMap<User, UserResponseDto>().ReverseMap();
            CreateMap<UserAddRequestDto,User>().ReverseMap();
            CreateMap<User, UserAddUpdateResponseDto>().ReverseMap();
            CreateMap<User, UserUpdateRequestDto>().ReverseMap();
            CreateMap<TasksAddRequestDto,Tasks>().ReverseMap();
            CreateMap<Tasks, TasksResponseDto>().ReverseMap();

            CreateMap<TasksUpdateRequestDto, Tasks>().ReverseMap();
            CreateMap<TasksAddResponseDto, Tasks>().ReverseMap();
            CreateMap<Project, ProjectResponseDto>().ReverseMap();
            CreateMap<ProjectAddRequestDto, Project>().ReverseMap();
            CreateMap<ProjectUpdateRequestDto, Project>().ReverseMap();
            CreateMap<Tasks, StatusResponseDto>().ReverseMap();
            CreateMap<Tasks, StatusRequestDto>().ReverseMap();
        }
    }
}
