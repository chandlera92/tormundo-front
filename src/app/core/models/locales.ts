export class Country {
  constructor(public id: number, public name: string, public code: number) {
  }
}

export class Language {
  constructor(public id: number, public name: string, public code: string, public nativeName: string) {
  }
}
