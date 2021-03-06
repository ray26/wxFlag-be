const Controller = require('egg').Controller;
class FlagController extends Controller{
    async create(){
        const {ctx,service,app} = this;
        const {UID,day,time,name}=ctx.request.body;
        const result = service.flag.create(UID,day,time,name);
        if(result.affectedRows===1){
            ctx.response.status=200;
            ctx.response.body={
                errcode: 0,
                errmsg: "写入成功"
            }
        }else{
            ctx.response.status=200;
            ctx.response.body={
                errcode: 1,
                errmsg: "已经存在相同Flag"
            }
        }
    };

    async getAll(){
        const {ctx,service,app} = this;
        const openid=ctx.request.body.openid;
        const result=await service.flag.getAll(openid);
        if(result.length===0){
            ctx.response.status=200;
            ctx.response.body={
                errcode: 1,
                errmsg: "暂无数据"
            }
        }else{
            ctx.response.status=200;
            ctx.response.body={
                errcode: 0,
                errmsg: result
            }
        }
    };
    async getDynamic(){
        const {ctx,service,app} = this;
        const UID=ctx.request.body;
        const result=await service.flag.getDynamic(UID);
        ctx.response.status=200;
        if(result.errcode===0){
            ctx.response.body={
                errcode: 0,
                errmsg: result.errmsg
            }
        }else if(result.errcode===1){
            ctx.response.body={
                errcode: 1,
                errmsg: result.errmsg
            }
        }
    };
    async getAllDynamic(){
        const {ctx,service,app} = this;
        const UID=ctx.request.body;
        const result=await service.flag.getAllDynamic(UID);
        ctx.response.status=200;
        if(result.errcode===0){
            ctx.response.body={
                errcode: 0,
                errmsg: result.errmsg
            }
        }else if(result.errcode===1){
            ctx.response.body={
                errcode: 1,
                errmsg: result.errmsg
            }
        }
    };
    async sign(){
        const {ctx,service,app} = this;
        const {openid,UID,pic,comment}=ctx.request.body;
        const result=await service.flag.sign(openid,UID,pic,comment);
        ctx.response.status=200;
        ctx.response.body={
            errcode: 0,
            errmsg: "签到成功"
        }
    };
    async join(){
        const {ctx,service,app} = this;
        const {openid,UID}=ctx.request.body;
        const result=await service.flag.join(openid,UID);
        ctx.response.body=200;
        ctx.response.body={
            errcode: 0,
            errmsg: "success"
        }
    }
}
module.exports=FlagController