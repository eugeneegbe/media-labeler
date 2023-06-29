<template>
    <div class="contrib-questions">
        <div class="input-group mb-3">
            <p class="question">Which region/country do you think the food in the image is associated with?</p>
            <select v-model="this.culture_data.region" class="response">
                <option v-for="option in this.region_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
            <input class="" v-model="this.culture_data.region_alt" v-if="this.culture_data.region === 'Other' " type="text" placeholder="Please Specify" />
        </div>
        <!-- <div class="input-group mb-3">
            <p class="question">How familiar are you with the cultural background of the food/culture item in the image?</p>
            <select v-model="this.culture_data.familiarity" class="response">
                <option v-for="option in this.familiarity_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
        </div> -->
        <div class="input-group mb-3">
            <p class="question">Do you think the food/culture depicted in the image is accurately represented by the file name or description?</p>
            <select v-model="this.culture_data.subject_relevance" class="response">
                <option v-for="option in this.other_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
            <span class="tooltip-btn" title="Note: This question is asking whether either the file name or description reflects Food as depicted in the image. Please select 'Yes' if either accurately reflects Food, 'No' if neither accurately reflects Food and 'I'm not sure' if you are uncertain">
            ?
            </span>
        </div>
        <div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CultureContribution',
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

            culture_data: {
                region: '',
                subject_relevance: '',
                region_alt: '',
            }
        }
    },
    methods: {
        initialState(){
            return {
                region: '',
                subject_relevance: '',
                region_alt: '',
            }
        },
        clearAllData() {
            Object.assign(this.$data.culture_data, this.initialState());
        }
    },
    mounted() {
        // we have to fetch the file name from props and make a request to get data
        console.log(this.filename)
    }
}
</script>

<style>
@media only screen and (max-width: 600px) {
    .response{
        width: 10rem;
        float: left;
    }
}
</style>