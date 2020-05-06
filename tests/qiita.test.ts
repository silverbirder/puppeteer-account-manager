import {QiitaService} from "#/service/qiita/qiitaService"
import {IService, IServiceResponse} from "#/service/iService"
import {QiitaAccount} from "#/service/qiita/qiitaAccount"
import {GoogleAuth} from "#/auth/googleAuth"

describe('Class: QiitaService', () => {
    test('Assert: accountUpdate response status is 200', async () => {
        const qiitaService: IService = new QiitaService();
        qiitaService.auth = new GoogleAuth({id: 'ID', password: 'PASS'});
        qiitaService.account = new QiitaAccount({avatar: ' avatar.png', introduction: ''});
        const response: IServiceResponse = await qiitaService.accountUpdate();

        expect(response.status).toBe(200)
    })
});