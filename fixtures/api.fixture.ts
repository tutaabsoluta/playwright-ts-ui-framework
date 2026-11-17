import { test as base } from '@playwright/test';
import { AutomationExerciseApi } from '../services/AutomationExerciseApi';

type Api = {
    api: AutomationExerciseApi;
};

export const test = base.extend<Api>({
    api: async ({ request }, use) => {
        await use(new AutomationExerciseApi(request));
    },
});
