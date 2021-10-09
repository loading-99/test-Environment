<!--  -->
<template>
<div>
    <div class="tabs">
        <ul>
            <li class="tabhead">地区：</li>
            <li v-for="(item,index) in tabs.area" :class="[item==area?'active':'']" :key="index" @click="changearea(item)">{{item}}</li>
        </ul>
        <ul>
            <li class="tabhead">类型：</li>
            <li v-for="(item,index) in tabs.type" :class="[item==type?'active':'']" :key="index" @click="changetype(item)">{{item}}</li>
        </ul>
        <ul>
            <li class="tabhead">排序：</li>
            <li v-for="(item,index) in tabs.order" :class="[item==order?'active':'']" :key="index" @click="changeorder(item)">{{item}}</li>
        </ul>
    </div>
    <mvs :msg="mvdata"/>
    <Pagination @pagedata="pagechange" :msg="[pagenumber,page]"/>
</div>
</template>

<script>

import mvs from '../tools/mv';
import Pagination from '../tools/Pagination';
import { requst } from "@/utils/requst"

const count = 40;

export default {
components:{
    mvs,
    Pagination
},
data() {
return {
    mvdata:null,
    area:"全部",
    type:"全部",
    order:"上升最快",
    page:0,
    pagenumber:0

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.tabs = {
        area:["全部","内地","港台","欧美","日本","韩国"],
        type:["全部","官方版","原声","现场版","网易出品"],
        order:["上升最快","最热","最新"]
    }
    this.getmvs();
    
    
},
watch:{
    page(){
        if(this.page != 0){
            this.getmvs();
        }
    }
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
    getmvs(){
        requst.get('/mv/all',{
            params:{
                limit:count,
                offset:this.page,
                area:this.area,
                order:this.order,
                type:this.type

            }
        }).then(res=>{
            this.mvdata = res.data;
            if(res.count){this.pagenumber = Math.ceil((res.count)/40)*10;}
            // console.log(res.data);
        })
    },
    changearea(data){
        if(this.area != data){
            this.area = data
            this.page = 0
            this.getmvs()
        }
        
    },
    changetype(data){
        if(this.type != data){
            this.type = data
            this.page = 0
            this.getmvs()
        }
        
    },
    changeorder(data){
        if(this.order != data){
            this.order = data
            this.page = 0
            this.getmvs()
        }
        
    },
    pagechange(data){
        if(data != 0) this.page = (data-1)*count;
        
    }

}
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.tabs{
    padding: 10px;
    ul{
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: flex;
        margin-bottom: 15px;
        li{
            font-size: 13px;
            color: var(--text-color);
            padding: 6px 8px;
            letter-spacing: 1px;
            margin: 0 15px;
        }
        .tabhead{
            color: var(--text-color);
        }
        .active{
            color: #C62F2F;
            background-color: rgba($color: rgb(240, 202, 202), $alpha: .2);
            border-radius: 13px;
        }
    }
}
</style>