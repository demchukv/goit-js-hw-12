import{S as h,i as m,a as g}from"./assets/vendor-a57f9cde.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerpolicy&&(t.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?t.credentials="include":s.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(s){if(s.ep)return;s.ep=!0;const t=a(s);fetch(s.href,t)}})();const p="/goit-js-hw-12/assets/alert-7962080a.svg",u=document.querySelector(".form"),o=document.querySelector(".get-more-btn"),r={searchBtn:".search-btn",searchTerm:".searchTerm",loader:".loader",gallery:".gallery",galLink:".gallery-link"},c={url:"https://pixabay.com/api/",searchParams:{key:"40878457-91c7c8077e8a58c5727309d44",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:1},searchPhotosBtn:document.querySelector(r.searchBtn),searchTerm:document.querySelector(r.searchTerm),loader:document.querySelector(r.loader),gallery:document.querySelector(r.gallery),simpleGallery:new h(r.gallery+" a",{overlayOpacity:.8,captionsData:"alt",captionDelay:250}),startSearch(e){if(e.preventDefault(),this.searchTerm.value.trim().length<3){this.showAlert("Please, enter search term!");return}this.gallery.innerHTML="",this.searchParams.q=this.searchTerm.value.trim(),this.searchParams.page=1,this.fetchPhotos()},continueSearch(){this.searchParams.page+=1,this.fetchPhotos()},renderPhotos(e){if(e.total===0){this.showAlert("Sorry, there are no images matching your search query. Please try again!"),this.showLoader(!1);return}const l=e.hits.map(a=>`<a class="gallery-link" href="${a.largeImageURL}"><span class="gallery-item"><img class="gallery-image" src="${a.webformatURL}" alt="${a.tags}" title="${a.tags}" /></span>
                <span class="img-stat">
                <span class="img-stat-item"><span class="img-stat-title">Likes</span><span class="img-stat-val">${a.likes}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Views</span><span class="img-stat-val">${a.views}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Comments</span><span class="img-stat-val">${a.comments}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Downloads</span><span class="img-stat-val">${a.downloads}</span></span>
                </span>
                </a>`).join("");this.gallery.insertAdjacentHTML("beforeend",l),this.searchParams.page===1&&e.totalHits>1&&(o.style.display="block"),Math.ceil(e.totalHits/this.searchParams.per_page)===this.searchParams.page&&(o.style.display="none",this.showAlert("We're sorry, but you've reached the end of search results.")),this.simpleGallery.refresh(),this.scrollTop()},scrollTop(){if(this.searchParams.page>1){const e=document.querySelector(r.galLink).getBoundingClientRect();window.scrollBy({top:e.height*2,left:0,behavior:"smooth"})}},showLoader(e=!0){this.loader.style.display=e?"inline-block":"none",this.searchPhotosBtn.disabled=e},showAlert(e){m.show({position:"center",iconUrl:p,messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",close:!1,closeOnClick:!0,message:e})},async fetchPhotos(){this.showLoader(!0);try{const e=await g.get(this.url,{params:this.searchParams});this.renderPhotos(await e.data)}catch(e){this.showAlert(e.message)}this.showLoader(!1)}};u.addEventListener("submit",e=>c.startSearch(e));o.addEventListener("click",()=>c.continueSearch());
//# sourceMappingURL=commonHelpers.js.map
