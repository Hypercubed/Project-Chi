import footerHTML from 'common/partials/footer.html!text';
import headerHTML from 'common/partials/header.html!text';

const AppComponent = {
  template: `
    <div class="header">
      ${headerHTML}
    </div>

    <div class="container">
      <div ng-view autoscroll class="ng-fade"></div>
    </div>

    <div class="footer">
      ${footerHTML}
    </div>

    <div growl></div>`
};

export default AppComponent;
