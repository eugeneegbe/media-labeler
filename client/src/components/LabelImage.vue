<template>
    <NavBar />
    <div class="container text-center  mt-3 mb-3">
        <div class="px-0 image-wrapper bg-light">
            <button class="previous-image-btn btn btn-link btn-lg desktop-img-nav" title="View the previous image"><font-awesome-icon class="arrow" icon="fa-solid fa-caret-left" />PREV IMAGE</button>
            <div class="img-holder"><img src="https://upload.wikimedia.org/wikipedia/commons/8/83/OldSanJuan_House_Red.JPG" alt=""><!-- src updated by JavaScript -->
            </div>
            <button id="" class="next-image-btn btn btn-link desktop-img-nav btn-lg" title="View the next image">NEXT
                IMAGE<font-awesome-icon class="arrow" icon="fa-solid fa-caret-right" /></button>
        </div>
        <div class="container px-0 bg-light">
            <div id="edit_image_info">
                <div class="image-desc">
                    <p>File: &nbsp;<span id="image_name" title="Open this image on Wikimedia Commons"></span></p>
                    <p>Description: &nbsp;<span id="image_description"></span></p>
                    <p>Categories: &nbsp;<span id="image_categories"></span></p>
                    <p>Camera Location: &nbsp;<span id="image_camera_location"></span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar';

export default {
    name: 'LabelImage',
    components: {
        NavBar
    }
}
</script>

<style>

.image-desc p{
    text-align: left;
    margin-left: 20px;
    font-weight: 500;
}


.image-wrapper{
    display: flex;
    justify-content: space-evenly;
}

.img-holder{
    height: 300px;
    position: relative;
    overflow: hidden;
    background-color: #444;
}

.img-holder img {
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.btn-lg {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
}

.image-desc {
    font-size: 12px;
    line-height: 1.5;
    padding: 10px;
    box-sizing: border-box;
}

button.btn.btn-link {
    border: 0;
    vertical-align: baseline;
    text-decoration: none;
    font-weight: bold;
}

.arrow {
    font-size: 3rem;
    vertical-align: middle;
}
</style>