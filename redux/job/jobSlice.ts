import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobState } from '../../interfaces';

interface Jobs {
    jobs: JobState[] | null,
    myApplies: JobState[] | null,
    isLoadingJob: boolean
}

const initialState: Jobs = {
    jobs: null,
    myApplies: null,
    isLoadingJob: false
}

type Input = 'jobs' | 'myApplies'

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<{ job: JobState, input?: Input }>) => {
            const { job, input = 'jobs' } = action.payload
            state[input] = state[input] ? [job, ...state[input]] : []
        },
        removeJob: (state, action: PayloadAction<{ id: JobState['id'], input?: Input }>) => {
            const { id, input = 'jobs' } = action.payload
            state[input] = state[input] ? state[input].filter(job => job.id !== id) : []
        },
        listJobs: (state, action: PayloadAction<{ jobs: JobState[], input?: Input }>) => {
            const { jobs, input = 'jobs' } = action.payload
            state[input] = jobs
        },
        clearJobs: (state) => {
            state.isLoadingJob = false
            state.jobs = null
            state.myApplies = null
        },
    }
});

export const { addJob, removeJob, listJobs, clearJobs } = jobSlice.actions;

export default jobSlice.reducer