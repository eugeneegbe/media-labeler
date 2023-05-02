<template>
    <NavBar ref="navBar" />
    <div v-if="this.images.length > 1" class="container text-center  mt-3 mb-3">
        <div class="px-0 image-wrapper bg-light">
            <button v-on:click="prevImage()" class="previous-image-btn btn btn-link btn-lg desktop-img-nav"
                title="View the previous image"><font-awesome-icon class="arrow-icon" icon="fa fa-chevron-left" />PREV
                IMAGE</button>
            <div class="img-holder"><img :src="this.images[this.index].url" alt="File here">
            </div>
            <button v-on:click="nextImage()" id="" class=" next-image-btn btn btn-link desktop-img-nav btn-lg"
                title="View the next image">NEXT
                IMAGE<font-awesome-icon class="arrow-icon" icon="fa fa-chevron-right" /></button>
        </div>
        <div class="editor-container px-0 bg-light">
            <div id="edit_image_info">
                <p><strong><span class="pt-1 mt-1"></span>{{ this.selected_category }} </strong></p>
                <div class="image-desc">
                    <p><strong>File name:</strong>&nbsp;&nbsp;<span id="image_name"
                            title="Open this image on Wikimedia Commons">{{ this.images[this.index].filename }}</span></p>
                    <p><strong>Description:</strong>&nbsp;&nbsp;<span v-html="this.current_file_description"></span></p>
                </div>
            </div>
        </div>
        <div class="edit-box-header pd-5">
            <div edit-type="depicts" class="edit-publish-btn-group text-right">
                <button v-on:click="cancelContribution" class="btn btn-sm btn-link  btn-link-danger cancel-edits-btn"
                    title="Cancel your changes">Cancel</button>
                <button v-on:click="sendContribution" type="submit" class="btn btn-sm btn-primary publish-edits-btn"
                    title="Save your edits">Save</button>
            </div>
        </div>
        <div class="px-1 bg.light edit-box">
            <div v-if="this.track === 'gender'" class="">
                <h5>Gender</h5>
                <!-- Add gender track here -->
                <GenderContribution ref="genderContribution" :filename="this.images[this.index].filename" />
            </div>
            <!-- Display for Culture setup -->
            <div v-if="this.track === 'culture'">
                <h5>Culture</h5>
                <CultureContribution ref="cultureContribution" />
            </div>
            <!-- Display for Culture setup -->
            <div v-if="this.track === 'cloth'">
                <h5>Clothing/Dress</h5>
                <ClothContribution ref="clothContribution" />
            </div>
        </div>
    </div>
    <div v-else class="">
        <h2> There are no images in this category</h2>
    </div>
    <div class="mobile-navigator px-0 image-wrapper">
        <button v-on:click="this.prevImage()" class=" previous-image-btn-mobile btn btn-link btn-lg desktop-img-nav"
            title="View the previous image"><font-awesome-icon class="arrow-icon" icon="fa fa-chevron-left" />PREV
            IMAGE</button>
        <button v-on:click="this.nextImage()" id="" class="next-image-btn-mobile btn btn-link desktop-img-nav btn-lg"
            title="View the next image">NEXT
            IMAGE<font-awesome-icon class="arrow-icon" icon="fa fa-chevron-right" />
        </button>
    </div>
</template>

<script>
import NavBar from './NavBar';
import axios from 'axios';
import GenderContribution from './GenderContribution';
import CultureContribution from './CultureContribution';
import ClothContribution from './ClothContribution';

const base_url = 'https://comelab-server.toolforge.org';
// const try_base_url = 'http://localhost:5000';

export default {
    name: 'LabelImage',
    components: {
        NavBar,
        GenderContribution,
        CultureContribution,
        ClothContribution
    },
    data() {
        return {
            images: [
            {
                url: "",
                filename: "",
                descriptionurl: "descriptionurl",
            }
            ],
            index: 0,
            track: '',
            selected_category: '',
            contribution_saved: null,
            current_user: 'Anonymous',
            current_file_description: 'N/A'
        }
    },

    methods: {
        nextImage() {
            this.index++;
            if (this.index === this.images.length) {
                this.index = 0;
            }
            this.getCurrentFileDescription();
        },
        prevImage() {
            this.index--;
            if (this.index === 0) {
                this.index = this.images.length - 1
            }
            this.getCurrentFileDescription();
        },
        makeContribution() {
            if (this.track) {
                let contribution = {}
                contribution.filename = this.images[this.index].filename
                contribution.track = this.track
                contribution.username = this.$refs.navBar.username
                switch (this.track) {
                    case 'gender':
                        contribution.response = this.$refs.genderContribution.gender_data
                        break;
                    case 'culture':
                        contribution.response = this.$refs.cultureContribution.culture_data
                        break;
                    case 'cloth':
                        contribution.response = this.$refs.clothContribution.clothing_data
                        break;
                    default:
                        break;
                }
                return contribution
            } else {
                this.$route.push({ name: 'HomePage' });
                alert('please select a track to contribute')
            }
        },
        clearAnswerField(track){
            switch(track){
                case 'gender':
                    this.$refs.genderContribution.clearAllData();
                    break;

                case 'culture':
                    this.$refs.cultureContribution.clearAllData();
                    break;
                case 'cloth':
                    this.$refs.clothContribution.clearAllData();
                    break;
                default:
                    break;
            }
        },
        async sendContribution() {
            const contribution = this.makeContribution()
            let result = await axios.post(base_url + '/contributions', contribution);
                if (result.data == 'success') {
                    this.nextImage()
                    // We need to add flash message here for success
                    this.contribution_saved = true
                    alert('contribution was saved')
                    this.clearAnswerField(this.track)
                } else {
                    this.contribution_saved = false
                    console.log('saving did not work')
                }
        },
        cancelContribution() {
            this.clearAnswerField(this.track)
        },
        async fetchImages(){
                let response = await axios.get(base_url + '/images?category=' + this.selected_category);
                if (response.status == 200) {
                    this.images = response.data
                    this.getCurrentFileDescription()
                } else {
                    this.$route.push({ name: 'HomePage' });
                    console.log('could not fetch images')
                }
            },
        async getCurrentFileDescription(){
                let response = await axios.get(base_url + '/images/describe?filename='+ this.images[this.index].filename);
                if (response.status == 200) {
                    this.current_file_description = response.data
                } else {
                    this.current_file_description = 'N/A'
                    console.log('could not fetch images')
                }
            }
    },
    mounted() {

        let selectedTrack = this.$route.params.track;
        let selectedCategory = this.$route.params.category
        if (selectedTrack !== 'null' && selectedCategory !== 'null' ) {
            this.track = this.$route.params.track;
            this.current_user = this.$route.params.username
            this.$refs.navBar.username = this.current_user
            this.selected_category = this.$route.params.category;
            this.fetchImages();
            this.index = Math.floor(Math.random() * (this.images.length - 1));
        } else {
            this.$route.push({ name: 'HomePage' });
        }

    }
}
</script>

<style>
.image-desc {
    margin-left: 50px;
}

.image-desc p {
    text-align: left;
    margin-left: 20px;
    margin: 5px;
}

.image-wrapper {
    display: flex;
    justify-content: space-evenly;
}

.img-holder {
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
    font-size: 0.7rem;
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

.arrow-icon {
    font-size: 3.5rem;
    vertical-align: middle;
    margin-top: 0rem;

}

.edit-box {
    margin-top: 2rem;
    border: solid 1px #6690da;
    border-radius: 5px;
}

.edit-box-header {
    position: relative;
    border-top: solid 1px #13caf0;
}

.edit-publish-btn-group {
    position: absolute;
    padding: 10px;
    right: 0;
    top: 0;
}

.edit-answer-box {
    display: contents;
}

.edit-answer-box button {
    margin: 20px;
    right: 0;
    left: 0;
    width: 100px;
}

.edit-answer-box button:hover {
    border-bottom: 1px solid black;
    background-color: rgb(161 177 205);
    font-weight: 600;
}

.btn-link-danger {
    color: rgb(239, 187, 187);
}

.btn-link-danger:hover {
    color: red;
    font-weight: bolder;
}

.input-group {
    display: flexbox;
    justify-content: space-between;
    max-width: fit-content;
    padding: 0 10px;
}

.question {
    padding-right: 2rem;
    font-size: larger;
    font-weight: bolder;
    float: left;
    margin-left: 0;
    text-align: left;
}

.response {
    height: 2rem;
    float: right
}

.region_alt {
    margin-left: 20px !important;
    height: max-content;
}
.mobile-navigator{
    display: none;
}

@media only screen and (max-width: 600px) {
    .mobile-navigator{
        display: block;
        position: sticky;
        height: 5rem;
    }
    .response{
        width: 10rem;
        float: left;
    }
    .edit-box{
        margin-top: 3rem;
    }
    .next-image-btn-mobile,
    .previous-image-btn-mobile {
        color: white;
        margin-top: 1rem;
        font-weight: 300;
    }
    .image-desc{
        margin-left: 0px;
    }
}
</style>