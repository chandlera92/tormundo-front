export class Organization {
  constructor(public id: number, public name: string) {
  }
}

export class PublicOrganization {
  constructor(public name: string,
              public lat: number,
              public lng: number,
              public profiles: PublicOrganizationProfile[]) {
  }
}

export class PublicOrganizationProfile {
  constructor(public description: string,
              public cover_image: string,
              public language_id: number) {
  }
}

