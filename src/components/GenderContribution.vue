<template>
    <div class="contrib-questions">
        <!-- <div class="input-group mb-3">
            <p class="question">Is the gender of the person in the image clear or unclear (ambiguous)?</p>
            <select v-model="this.gender_data.clarity" class="response">
                <option v-for="option in this.clarity_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
        </div> -->
        <div class="input-group mb-3">
            <p class="question">Which gender(s) do you think the person in the image could possibly identify as?</p>
            <select v-model="this.gender_data.identity_type" class="response">
                <option v-for="option in this.identity_type_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
        </div>
        <div class="input-group mb-3">
            <p class="question">Do you think the gender of the person depicted in the image is accurately represented by the file name or description?</p>
            <select v-model="this.gender_data.depict_accuracy" class="response">
                <option v-for="option in this.other_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
            <span class="tooltip-btn" data-toggle="tooltip" data-placement="right" title="Note: This question is asking whether either the file name or description accurately reflects the gender of the person depicted in the image. Please select 'Yes' if either accurately reflects the gender, 'No' if neither accurately reflects the gender, and 'I'm not sure' if you are uncertain.">
            ?
            </span>
        </div>
        <div class="input-group mb-3">
            <p class="question">Do you think the gender of the person depicted in the image is relevant to the subject matter or context?</p>
            <select v-model="this.gender_data.subject_relevance" class="response">
                <option v-for="option in this.other_options" v-bind:value="option.name" v-bind:key="option.id">
                    {{ option.name }}
                </option>
            </select>
            <span class="tooltip-btn" title="Note: The images are randomly generated and may or may not depict People">
            ?
            </span>
        </div>
        <div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GenderContribution',
    props: {
      filename: String
    },
    data() {
        return {
            clarity_options: [
                { id: 1, name: 'Clear' },
                { id: 2, name: 'Unclear (Ambiguous)' }
            ],
            identity_type_options: [
                { id: 1, name: 'Male' },
                { id: 2, name: 'Female' },
                { id: 3, name: 'Non-binary' },
                { id: 4, name: 'Not sure' }
            ],
            other_options: [
                { id: 1, name: 'Yes' },
                { id: 2, name: 'No' },
                { id: 3, name: 'Not sure' }
            ],
            gender_data: {
                identity_type: '',
                clarity: '',
                depict_accuracy: '',
                subject_relevance: ''
            }
        }
    },
    methods: {
        initialState(){
            return {
                identity_type: '',
                clarity: '',
                depict_accuracy: '',
                subject_relevance: ''
            }
        },
        clearAllData() {
            Object.assign(this.$data.gender_data, this.initialState());
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