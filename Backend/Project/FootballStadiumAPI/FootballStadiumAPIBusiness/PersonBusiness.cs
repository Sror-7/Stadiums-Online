using FootballStadiumAPIDataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using System;
using FootballStadiumAPIDataAccess.DTOs;

namespace FootballStadiumAPIBusiness
{
    public class PersonBusiness
    {
        public readonly CloudinaryService _cloudinaryService;
        public PersonBusiness(CloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
        }
        public static int AddNewPerson(PersonDTO newPerson)
        {
            return PersonData.AddNewPerson(newPerson);
        }
        public static int AddNewPerson(NewPersonCreateDTO newPerson)
        {
            return PersonData.AddNewPerson(newPerson);
        }
        public static PersonDTO Find(int id)
        {
            return PersonData.GetPersonInfoByID(id);
        }
        public static bool UpdatePerson(PersonDTO Person)
        {

            return PersonData.UpdatePerson(Person);
        }
        public async Task<Result<bool>> PatchPersonAsync(int ID, JsonPatchDocument<PersonUpdateDTO> patchDoc)
        {

            var person = PersonData.GetPersonInfoByID(ID);
            if (person == null)
                return Result<bool>.Fail("Person not found!");


            var dto = new PersonUpdateDTO
            {
                Name = person.Name,
                Address = person.Address,
                Gender = person.Gender,
                Phone = person.Phone,
                DateOfBirth = person.DateOfBirth,
            };


            patchDoc.ApplyTo(dto);


            person.Name = dto.Name;
            person.Phone = dto.Phone;
            person.Gender = dto.Gender;
            person.Address = dto.Address;
            person.DateOfBirth = dto.DateOfBirth;



            var updated = PersonData.UpdatePerson(person);

            return updated
                ? Result<bool>.Ok(true)
                : Result<bool>.Fail("Update failed");
        }
        public async Task<Result<bool>> UpdatePersonImage(int id, IFormFile? PersonImage)
        {
            string pictureUrl = null;

            if (PersonImage != null)
            {
                pictureUrl = await _cloudinaryService.UploadImageAsync(PersonImage);

            }

            var updated = PersonData.UpdatePersonImage(id, pictureUrl);

            return updated
                ? Result<bool>.Ok(true)
                : Result<bool>.Fail("Update failed");
        }

    }
}
