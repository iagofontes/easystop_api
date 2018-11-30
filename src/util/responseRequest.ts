export class ResponseRequest {

    private mensagem: String;
    private httpCode: number;

    constructor(mensagem: String, httpCode: number) {
        this.mensagem = mensagem;
        this.httpCode = httpCode;
    }

    public getMensagem() : String {
        return this.mensagem;
    }
    public setMensagem(mensagem: String) : void {
        this.mensagem = mensagem;
    }

    public getHttpResponse() : number {
        return this.httpCode;
    }
    public setHttpResponse(httpCode: number) : void {
        this.httpCode = httpCode;
    }
}