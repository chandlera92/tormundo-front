import {OrganizationAdminDisplayCardEffects} from '../organization/display-cards/store/display-cards.effects';
import {OrganizationEffects} from '../organization/store/organization.effects';
import {FileEffects} from '../shared/file-upload/store/file.effects';

export const AdminEffects: any[] = [OrganizationAdminDisplayCardEffects, OrganizationEffects, FileEffects];
