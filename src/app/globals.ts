import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
  API_URL = 'http://localhost:1337/api';
  login = this.API_URL + '/auth/login';
  register = this.API_URL + '/auth/register';
  logout = this.API_URL + '/auth/logout';
  forgotPassword = this.API_URL + '/auth/forgot-password';
  generateVerificationCode = this.API_URL + '/auth/generate_verification';
  verifyAccount = this.API_URL + '/auth/verify';
  test = this.API_URL + '/auth/test';
  user = this.API_URL + '/user';
  getCountriesAndLanguage = this.API_URL + '/general/locales';
  getSelfProfile = this.API_URL + '/user/profile';
  patchUser = this.API_URL + '/user/modify-profile';
  getOrganizations = this.API_URL + '/organizations';
  addOrganization = this.API_URL + '/organization';
  adminGetOrganizationCards = (organizationId) => this.API_URL + '/admin/organization/' + organizationId +'/cards';
  checkPasswordReset = (token) => this.API_URL + '/auth/reset-password/' + token;
  modifyOrganizationCard = (organizationName, cardId) => this.API_URL + '/admin/organization/' + organizationName + '/card/' + cardId;
  getOrganizationAndAccess = (organizationName) => this.API_URL + '/admin/organization/' + organizationName;
  getOrganizationMembers = (organizationName) => this.API_URL + '/admin/organization/' + organizationName + '/getMembers';
  addOrganizationFile = (organizationName) => this.API_URL + '/organization/' + organizationName + '/file';
  profile = (user) => this.API_URL + '/profile/' + user;
}
