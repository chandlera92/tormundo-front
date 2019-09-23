/* updateRouteParams(ev) {

   const getCard = this.cards.find(card => card.language_id === ev.value);
   if (getCard) {
     const checkEqual = isEqual(this.activeCard, this.unEditedActiveCard);
     if (!checkEqual) {
       this.canSwitchLanguageDialog = this.dialog.open(CanNavigateAwayDialogComponent, {
         width: '800px',
         data: {
           title: 'Save changes to current display card',
           body: 'Would you like to save changes before continuing? Any data will be lost if you proceed without changing.'
         }
       });
       return this.canSwitchLanguageDialog.afterClosed()
         .take(1)
         .subscribe(result => {
           if (result.close) {
             return this.updateToNewCard(getCard);
           }
           else {
             return false;
           }
         });
     }
     else {
       this.updateToNewCard(getCard);
     }
   }
   else {
     const getLang = this.languages.find(lang => lang.id === ev.value);
     if (getLang) {
       const confirmNewLanguage = this.dialog.open(CanNavigateAwayDialogComponent, {
           width: '800px',
           data: {
             title: 'Create display card in new language?',
             body: 'Are you sure you would like to create a new language card?'
           }
         }
       );
       return confirmNewLanguage.afterClosed()
         .take(1)
         .subscribe(result => {
           if (result.close) {
             const newCard = new OrganizationDisplayCard(null, this.organization.name, '', getLang.id, false, null, this.organization.location);
             this.cards.push(newCard);
             this.languagesInUse.push(ev.value);
             return this.updateToNewCard(newCard);
           }
           else {
             return false;
           }
         });

     }
     else {
       return false;
     }
   }
 }*/

/*       this.activeCard = newCard;
     this.setNewLangUrl(getLang.code);
     this.cardForm.patchValue({
       description: this.activeCard.description
     });
     this.store.dispatch(new AdminActions.SetOrganizationDisplayCardEdit(this.activeCard));
     this.store.dispatch(new AdminActions.SetOrganizationDisplayCard(cloneDeep(this.activeCard)));*/

/*
import * as AdminActions from '../../store/admin.actions';

dispatchItemActions() {
  return {
    copy: (item) => new AdminActions.SetOrganizationDisplayCardEdit(item),
    original: (item) => new AdminActions.SetOrganizationDisplayCard(cloneDeep(item))
  };
}
*/

/*  activateNavigationService(selectedLang) {
    return this.languageNavigation.handleNavigation(
      this.cards,
      {touched: this.activeCard, untouched: this.unEditedActiveCard},
      this.languages,
      selectedLang,
      {
        title: 'Save changes to current display card',
        body: 'Would you like to save changes before continuing? Any data will be lost if you proceed without changing.'
      }
    );
  }*/


/*
*
      // this.setLanguageState();
          this.store.dispatch(new AdminActions.SetOrganizationDisplayCard(this.unEditedActiveCard));
          this.store.dispatch(new AdminActions.SetOrganizationDisplayCardEdit(this.activeCard));


  setNewLangUrl(code) {
    this.location.replaceState(this.router.createUrlTree([this.router.url.split('?')[0]], {queryParams: {lang: code}}).toString());
  }


*/
/*       this.cardForm.patchValue({
           description: res.description
         });*/


/*  setLanguageState() {
    this.languagesInUse = this.organization.cards.map(card => card.language_id);

    const activeLanguages = [];

    for (const card of this.organization.cards) {
      this.activeLanguages.push(this.languages.find(lang => lang.id === card.language_id));
    }

    this.activeLanguages = activeLanguages;

    if (this.routeParams.lang) {
      const getRouteLangId = this.languages.find(lang => this.routeParams.lang === lang.code).id;
      const getRequestedCard = this.organization.cards.find(item => item.language_id === getRouteLangId);
      if (getRequestedCard) {
        this.activeCard = getRequestedCard;
        this.unEditedActiveCard = cloneDeep(getRequestedCard);
      }
      else {
        const getLang = this.languages.find(lang => lang.id === this.organization.language_id);
        const findCard = this.organization.cards.find(item => item.language_id === getLang.id);
        this.activeCard = findCard;
        this.unEditedActiveCard = cloneDeep(findCard);
        this.setNewLangUrl(getLang.code);
      }
    }
    else {
      const getLang = this.languages.find(lang => lang.id === this.organization.language_id);
      const findCard = this.organization.cards.find(item => item.language_id === getLang.id);
      this.activeCard = findCard;
      this.unEditedActiveCard = cloneDeep(findCard);
      this.setNewLangUrl(getLang.code);
    }
  }*/

// const service = this.activateNavigationService(ev.value);


/*    console.log(service);
    if (service) {
      this.cardForm.patchValue({
        description: service.description
      });
    }*/



/*    this.cardForm.valueChanges
      .takeWhile(() => this.subscriptionAlive)
      .subscribe(form => {
        console.log(1);
        this.activeCard.description = form.description;
        this.store.dispatch(new AdminActions.SetOrganizationDisplayCardEdit(this.activeCard));
      });*/

/*
    const urlParams = Observable.combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({...params, ...queryParams})
    );

    urlParams
      .take(1)
      .subscribe(routeParams => {
        this.routeParams = routeParams;
      });
*/
