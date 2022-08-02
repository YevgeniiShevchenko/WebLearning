// завдання 1
function User (name, age, height) {
    this.name = name;
    this.age = age;
    this.height = height;
    this.yearOfRegistration = new Date().getFullYear();
  } 
  
  User.prototype.birthYear = function() {
      const currentYear = new Date().getFullYear();
      return currentYear - this.age;
    };
  
  const user1 = new User('Ivan', 21, 175);
  console.log(user1)
  console.log(user1.birthYear())
  
  // завдання 2
  Object.defineProperty(user1, 'yearOfRegistration', {
    configurable: false,
    writable: false,
  })
  
  user1.yearOfRegistration = 2012
  delete user1.yearOfRegistration
  
  console.log(user1)
  
  // завдання 3
  class UserClass {
      constructor (name, age, height) {
        this.name = name;
        this.age = age;
        this.height = height;
        this.yearOfRegistration = new Date().getFullYear();
    }
    
    birthYear(){
        const currentYear = new Date().getFullYear();
      return currentYear - this.age;
    }
  }
  
  const user2 = new UserClass('Ivan', 21, 175);
  
  console.log(user2)
  console.log(user2.birthYear())