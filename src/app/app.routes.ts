import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { authGuard } from './auth-guard';
import { MyAccount } from './home/my-account/my-account';
import { Infos } from './home/infos/infos';
import { OpenAccount } from './home/open-account/open-account';
import { TransactionList } from './transactions/transaction-list/transaction-list';
import { TransactionDetail } from './transactions/transaction-detail/transaction-detail';
import { SendTransaction } from './transactions/send-transaction/send-transaction';

export const routes: Routes = [
    {
        path: "login",
        component: Login
    },
    {
        path: "register",
        component: Register
    },
    {
        path: "home",
        component: Home,
        canActivate: [authGuard],
        children: [
            {
                path: "",
                component: MyAccount
            },
            {
                path: "accounts/:accountId",
                component: Infos
            },
            {
                path: "open",
                component: OpenAccount
            },
            {
                path: "transactions/:accountId",
                component: TransactionList
            },
            {
                path: "transactions/:accountId/:transactionId",
                component: TransactionDetail
            },
            {
                path: "accounts/send/:accountId",
                component: SendTransaction
            }
        ]
    },
    {
        path: "**",
        redirectTo: "home"
    }
];
