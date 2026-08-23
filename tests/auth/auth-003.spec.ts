import test from "@playwright/test";
import { UserService } from "../../services/UserService.service";


test('Test de prueba', async ({page, request}) => {
    const userService = new UserService()

    const response = await userService.registerUser(request)

    console.log(response)
})