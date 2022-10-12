import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobState } from '../../interfaces';

interface Jobs {
    allJobs: JobState[] | null
    recruiterJobs: JobState[] | null,
    appliedJobs: JobState[] | null,

    postSelected: JobState | null
}

const initialState: Jobs = {
    appliedJobs: null,
    allJobs: null,
    recruiterJobs: null,

    postSelected: null
}

type Input = 'appliedJobs' | 'allJobs' | 'recruiterJobs'

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<{ job: JobState, input: Input }>) => {

            const { input, job } = action.payload

            state[input] = state[input] === null ? [job] : [job, ...state[input]!]
        },
        removeJob: (state, action: PayloadAction<{ id: number, input: Input }>) => {

            const { id, input } = action.payload

            state[input] = state[input]?.filter(job => job.id !== id) || state[input]
        },
        listJobs: (state, action: PayloadAction<{ jobs: JobState[], input: Input }>) => {
            const { input, jobs } = action.payload

            state[input] = [...jobs]
        },
        selectPostId: (state, action: PayloadAction<JobState | null>) => {
            state.postSelected = action.payload
        },
        clearJobs: (state) => {
            state.allJobs = null
            state.appliedJobs = null
            state.postSelected = null
            state.recruiterJobs = null
        },
    }
});

export const { addJob, removeJob, listJobs, clearJobs, selectPostId } = jobSlice.actions;

export default jobSlice.reducer