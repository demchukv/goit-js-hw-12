import{S as c,i as h,a as m}from"./assets/vendor-a57f9cde.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const g="/goit-js-hw-12/assets/alert-7962080a.svg",p=document.querySelector(".form"),o=document.querySelector(".get-more-btn"),n={url:"https://pixabay.com/api/",searchParams:{key:"40878457-91c7c8077e8a58c5727309d44",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:1},searchPhotosBtn:document.querySelector(".search-btn"),searchTerm:document.querySelector(".searchTerm"),loader:document.querySelector(".loader"),gallery:document.querySelector(".gallery"),simpleGallery:new c(".gallery a",{overlayOpacity:.8,captionsData:"alt",captionDelay:250}),startSearch(e){if(e.preventDefault(),this.searchTerm.value.trim().length<3){this.showAlert("Please, enter search term!");return}this.gallery.innerHTML="",this.searchParams.q=this.searchTerm.value.trim(),this.searchParams.page=1,this.fetchPhotos()},continueSearch(){this.searchParams.page+=1,this.fetchPhotos()},renderPhotos(e){if(e.total===0){this.showAlert("Sorry, there are no images matching your search query. Please try again!"),this.showLoader(!1);return}const r=e.hits.map(t=>`<a class="gallery-link" href="${t.largeImageURL}"><span class="gallery-item"><img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}" title="${t.tags}" /></span>
                <span class="img-stat">
                <span class="img-stat-item"><span class="img-stat-title">Likes</span><span class="img-stat-val">${t.likes}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Views</span><span class="img-stat-val">${t.views}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Comments</span><span class="img-stat-val">${t.comments}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Downloads</span><span class="img-stat-val">${t.downloads}</span></span>
                </span>
                </a>`).join("");if(this.showLoader(!1),this.gallery.insertAdjacentHTML("beforeend",r),this.searchParams.page===1&&e.totalHits>1&&(o.style.display="block"),Math.ceil(e.totalHits/this.searchParams.per_page)===this.searchParams.page&&(o.style.display="none",this.showAlert("We're sorry, but you've reached the end of search results.")),this.simpleGallery.refresh(),this.searchParams.page>1){const t=document.querySelector(".gallery-link").getBoundingClientRect();window.scrollBy({top:t.height*2,left:0,behavior:"smooth"})}},showLoader(e=!0){this.loader.style.display=e?"inline-block":"none",this.searchPhotosBtn.disabled=e},showAlert(e){h.show({position:"center",iconUrl:g,messageColor:"#FAFAFB",messageSize:"16px",backgroundColor:"#EF4040",close:!1,closeOnClick:!0,message:e})},async fetchPhotos(){this.showLoader(!0);try{const e=await m.get(this.url,{params:this.searchParams});this.renderPhotos(await e.data)}catch(e){this.showAlert(e.message),this.showLoader(!1)}}};p.addEventListener("submit",e=>n.startSearch(e));o.addEventListener("click",()=>n.continueSearch());
//# sourceMappingURL=commonHelpers.js.map