import { PaymentCard } from "../types/PaymentCard";
import { User } from "../types/User";

// The site accepts any card details; this is a standard test card number.
export const testCard = (user: User): PaymentCard => ({
    nameOnCard: `${user.firstname} ${user.lastname}`,
    number: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030',
});
