import {html} from '../lib.js';
import { getUserData } from '../util.js';
import { getOfferById, deleteOffer } from '../api/offers.js';



const detailsTemplate = (offer, isOwner, userData, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
          <img id="details-img" src="${offer.imageUrl}" alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >${offer.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${offer.requirements}</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">1</strong></p>

            ${isOwner ? html`
            <div id="action-buttons">
              <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} class="button" href="" id="delete-btn">Delete</a>` 
              : ''}

            ${userData ? html`
            <div id="action-buttons">
            <a href="" id="apply-btn">Apply</a>` 
            : ''}

            </div>
          </div>
        </section>`;

        export async function detailsView (ctx) {

            const offer = await getOfferById(ctx.params.id);
            
            const userData = getUserData();
            
            const isOwner = userData?.id == offer._ownerId;

            
        
            ctx.render(detailsTemplate(offer, isOwner,  userData, onDelete));
        
            async function onDelete(){
                const choice = confirm('Are you sure you want to delete this meme?');
        
                if(choice){
                    await deleteOffer(offer._id);
                    ctx.page.redirect('/dashboard');
                }
            }
        }