import { addOffer } from './api/offers.js';
import { logout } from './api/users.js';
import{page, render} from './lib.js';
import { getUserData } from './util.js';
import { addOfferView } from './views/addOffer.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/homeViews.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';




const main = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homeView);
page('/dashboard', dashboardView);
page('/data/offers/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/createOffer', addOfferView);


updateNav();
page.start();


function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    next();
}

function renderMain (templateResult){
    render(templateResult, main);
}

function updateNav(){
    const userData = getUserData();
    if(userData){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function onLogout(){
    console.log('logout');
    logout();
    updateNav();
    page.redirect('/dashboard');
}
