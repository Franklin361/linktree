import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobState } from '../../interfaces';

interface Jobs {
    jobs: JobState[] | null
    isLoadingJob: boolean
}

const initialState: Jobs = {
    jobs: null,
    isLoadingJob: false
}

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<JobState>) => {
            state.jobs = state.jobs ? [action.payload, ...state.jobs] : []
        },
        removeJob: (state, action: PayloadAction<JobState['id']>) => {
            state.jobs = state.jobs ? state.jobs.filter(job => job.id !== action.payload) : []
        },
        listJobs: (state, action: PayloadAction<JobState[]>) => {
            state.jobs = action.payload
        }
    }
});

export const { addJob, removeJob, listJobs } = jobSlice.actions;

export default jobSlice.reducer