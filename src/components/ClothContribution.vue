<template>
    <div class="contrib-questions">
        <div class="input-group mb-3">
            <p class="question">Which region/country do you think the cloth/dress in the image is associated with?</p>
            <select v-model="this.clothing_data.region" class="response">
                <option v-for="option in this.region_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
            <input  class="region_alt" v-model="this.clothing_data.region_alt" v-if="this.clothing_data.region === 'Other' " type="text" placeholder="Please Specify" />
        </div>
        <!-- <div class="input-group mb-3">
            <p class="question">Do you think the clothing in the image accurately represents the culture or region it is associated with?</p>
            <select v-model="this.clothing_data.accuracy" class="response">
                <option v-for="option in this.other_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
        </div> -->
        <div class="input-group mb-3">
            <p class="question">Do you think the clothing/dresses depicted in the image is accurately represented by the file name or description?</p>
            <select v-model="this.clothing_data.representation" class="response">
                <option v-for="option in this.other_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
            <span class="tooltip-btn" title="Note: This question is asking whether either the file name or description reflects Clothes/Dress as depicted in the image. Please select 'Yes' if either accurately reflects Clothes/Dress, 'No' if neither accurately reflects Clothes/Dress and 'I'm not sure' if you are uncertain.">
            ?
            </span>
        </div>
        <div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ClothContribution',
    props: {
      filename: String
    },
    data() {
        return {
            region_options: [
                { id: 1, name: 'North America' },
                { id: 2, name: 'South America' },
                { id: 3, name: 'Europe' },
                { id: 4, name: 'Asia' },
                { id: 5, name: 'Africa' },
                { id: 6, name: 'Australia/Oceania' },
                { id: 7, name: 'Other' }
            ],
            other_options: [
                { id: 1, name: 'Yes' },
                { id: 2, name: 'No' },
                { id: 3, name: 'Not sure' }
            ],

            clothing_data: {
                region: '',
                region_alt: '',
                representation: ''
            }
        }
    },
    methods: {
        initialState(){
            return {
                region: '',
                region_alt: '',
                representation: ''
            }
        },
        clearAllData() {
            Object.assign(this.$data.clothing_data, this.initialState());
        }
    },
    mounted() {

    }
}
</script>

<style>
@media only screen and (max-width: 600px) {
    .tooltip-btn{
        margin-left: 10rem;
        margin-right: 0;
    }
}

</style>