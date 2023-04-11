<template>
    <NavBar />
    <div v-if="this.contribution_saved" class="alert alert-success" role="alert">
        Contribution successful!
    </div>
    <div class="container text-center  mt-3 mb-3">
        <div class="px-0 image-wrapper bg-light">
            <button v-on:click="prevImage()" class="previous-image-btn btn btn-link btn-lg desktop-img-nav" title="View the previous image"><font-awesome-icon class="arrow" icon="fa fa-chevron-left" />PREV IMAGE</button>
            <div class="img-holder"><img :src="this.images[this.index].url" alt="File here"><!-- src updated by JavaScript -->
            </div>
            <button  v-on:click="nextImage()" id="" class="next-image-btn btn btn-link desktop-img-nav btn-lg" title="View the next image">NEXT
                IMAGE<font-awesome-icon class="arrow" icon="fa fa-chevron-right" /></button>
        </div>
        <div class="container px-0 bg-light">
            <div id="edit_image_info">
                <div class="image-desc">
                    <p>File: &nbsp;<span id="image_name" title="Open this image on Wikimedia Commons">{{ this.images[this.index].filename }}</span></p>
                    <p>Description: &nbsp;<span id="image_description">{{ this.images[this.index].description }}</span></p>
                    <p>Categories: &nbsp;<span id="image_categories"></span>{{ this.images[this.index].categories }}</p>
                </div>
            </div>
        </div>
        <div class="edit-box-header">
        <div edit-type="depicts" class="edit-publish-btn-group text-right">
            <button v-on:click="cancelContribution" class="btn btn-sm btn-link  btn-link-danger cancel-edits-btn"
                title="Cancel your changes">Cancel</button>
            <button v-on:click="makeContribution" type="submit" class="btn btn-sm btn-primary publish-edits-btn"
                title="Save your edits">Save</button>
        </div>
    </div>
        <div class="container px-0 bg.light">
            <div v-if="this.track === 'gender'" class="container edit-box">
                <h5>Gender</h5>
                <!-- Add gender track here -->
                <GenderContribution ref="genderContribution" :filename="this.images[this.index].filename"/>
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
</template>

<script>
import NavBar from './NavBar';
import axios from 'axios';
import GenderContribution from './GenderContribution';
import CultureContribution from './CultureContribution';
import ClothContribution from './ClothContribution';

export default {
    name: 'LabelImage',
    components:{
        NavBar,
        GenderContribution,
        CultureContribution,
        ClothContribution
    },
    data(){
        return {
            images: [
                {
                    url: "https://upload.wikimedia.org/wikipedia/commons/8/83/OldSanJuan_House_Red.JPG",
                    filename: "OldSanJuan House Red.JPG",
                    description: "Detail of colonial house.",
                    categories: " Buildings in Old San Juan, Puerto Rico | Colonial Buildings"
                },
                {
                    url: "https://upload.wikimedia.org/wikipedia/commons/5/56/BASA-3K-7-355-135-Cultural_review_of_the_nations_in_Hamburg%2C_1936.jpg",
                    filename: "BASA-3K-7-355-135-Cultural review of the nations in Hamburg, 1936.jpg",
                    description: "Views and photos from an international congress (cultural review of the nations in Hamburg, 1936). Bulgaria",
                    categories: " Hamburgh | Nexting"
                },
                {
                    url: "https://upload.wikimedia.org/wikipedia/commons/0/00/BASA-2072K-1-373-19-Kukeri_from_Bulgaria.JPG",
                    filename: "BASA-2072K-1-373-19-Kukeri from Bulgaria.JPG",
                    description: "Kukeri from Bulgaria.",
                    categories: "Bulgaria | Kukeri"
                },
                {
                    url: "https://upload.wikimedia.org/wikipedia/commons/4/43/BASA-1771K-1-1149-1-Aleko_Konstantinov.jpeg",
                    filename: "BASA-1771K-1-1149-1-Aleko Konstantinov.jpeg",
                    description: "Aleko Konstantinov.",
                    categories: "Aleko | Konstantinov."
                }
            ],
            index: 0,
            track: '',
            genderResponse: {},
            cultureResponse: {},
            contribution_saved: null
        }
    },

    methods: {
        nextImage(){
            this.index++;
            if(this.index === this.images.length){
                this.index = 0;
            }
        },
        prevImage(){
            this.index--;
            if (this.index === 0) {
                this.index = this.images.length - 1
            }
        },
        async sendContribution(contribution){
            let result = await axios.post('http://localhost:8000/contribution', contribution);
            if(result.data.status == 'success'){
                return result.data
            }
            return null
        },
        async makeContribution(){
            if(this.track){
                let contribution = {}
                contribution.filename = this.images[this.index].filename
                contribution.track = this.track
                contribution.username = 'Eugene233'
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
                console.log(contribution)
                let isSaved = await this.sendContribution(contribution)
                if(isSaved.status == 'success'){
                    this.nextImage()
                    // We need to add flash message here for success
                    this.contribution_saved = true
                }else{
                    this.contribution_saved = null
                    console.log('saving did not work')
                }
            }else{
                this.$route.push({name: 'HomePage'});
                alert('please select a track to contribute')
            }
        },
        cancelContribution(){
            if(this.track === 'gender'){
                this.genderResponse = null
            }else{
                console.log('canceling culture')
            }
        }
    },
    mounted(){
        let selectedTrack = this.$route.params.track;
        if(selectedTrack !== 'null'){
            this.track = this.$route.params.track;
            this.index = Math.floor(Math.random() * (this.images.length - 1))
        }else{
            this.$route.push({name: 'HomePage'});
        }

    }
}
</script>

<style>

.image-desc{
    margin-left: 50px;
}

.image-desc p{
    text-align: left;
    margin-left: 20px;
    margin: 5px;
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

.container.edit-box {
    margin-top: 10px;
    padding: 10px;
    border: solid 1px #a2a9b1;
    border-radius: 5px;
}

.edit-box-header {
    position: relative;
}

.edit-publish-btn-group {
    position: absolute;
    right: 0;
    top: 0;
}

.edit-answer-box {
    display: contents;
}
.edit-answer-box button{
    margin: 20px;
    right: 0;
    left: 0;
    width: 100px;
}
.edit-answer-box button:hover{
    border-bottom: 1px solid black;
    background-color: rgb(161 177 205);
    font-weight: 600;
}
.btn-link-danger{
    color: rgb(239, 187, 187);
}
.btn-link-danger:hover{
    color: red;
    font-weight: bolder;
}
.input-group{
    display: flexbox;
    justify-content: space-between;
    max-width: fit-content;
    padding: 0 10px;
}
.question{
    padding-right: 2rem;
    font-size: larger;
    font-weight: bolder;
    float: left;
    margin-left: 0;
    text-align: left;
}
.response{
    height: 2rem;
    float: right
}
.region_alt{
    margin-left: 20px!important;
    height: max-content;
}
</style>