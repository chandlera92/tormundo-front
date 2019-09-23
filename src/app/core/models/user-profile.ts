export class UserProfile {
  constructor(public first_name: string,
              public last_name: string,
              public description: any,
              public gravatar: any,
              public gravatar_active: boolean,
              public profile_image: string,
              public isPublic: boolean) {
  }
}
