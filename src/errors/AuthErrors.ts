export class NotAuthenticatedError extends Error {
    constructor() {
      super("User is not authenticated");
      this.name = "NotAuthenticatedError";
    }
  }
  
  export class UserIdNotAvailableError extends Error {
    constructor() {
      super("User ID not available");
      this.name = "UserIdNotAvailableError";
    }
  }
  
  export class ProfileUpdateError extends Error {
    constructor(message: string = "Failed to update profile") {
      super(message);
      this.name = "ProfileUpdateError";
    }
  }