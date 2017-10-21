<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="5">
        <div class="about">
          <p class="first">关于</p>
          <h3 style="font-weight: bolder">小镇诞生之旅</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p style="text-align:justify; text-indent:2em;">
            在我读大学时就想做一个自己拥有的网站了，可由于自己的专业是微电子，主修的课是物理、化学等学术性课程，只有一门单片机原理还和编程有点关系，所以就放弃了这个梦想。毕业后开始了我的6年电子工程师和2年的android开发工程师之路，直到2017年7月遇到张敏同学，他是90后小清新，也是一名化工研究生，可能当时化工行业不景气，也可能感觉化工行业没前途，他就自学了web。正巧我们公司正在招聘web工程师，就这样被我的一个同事招了进来。我们渐渐认识，之后我就经常请教他关于web方面的知识，他也会认真的和我讲解并指领我学习的方向，5个月后有了这个Cheyy小镇，在这里我要衷心的感谢他，没有他，Cheyy小镇也将不复存在。最后我要说一下为什么叫Cheyy小镇，我叫车芸艺所以Cheyy是我名字拼音的缩写，后面的小镇是因为在我读书时玩过一个很有意思的游戏叫《不可思议的小镇》，游戏里的小镇充满了奇幻与谜等待着我去探索，我想我的网站也将是拥有奇幻色彩的地方，等待你的到来与探索......
            <br>
          </p>

          <h3 style="font-weight: bolder">兴趣爱好</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            看电影 &nbsp; 编程 &nbsp; 小制作 &nbsp; 深度学习 &nbsp; 魔术
          </p>

          <h3 style="font-weight: bolder">个人标签</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            车芸艺 &nbsp; 男 &nbsp; 90前技术仔 &nbsp; 生化危机脑残粉 &nbsp; 现居于上海
          </p>

          <!--<h3 style="font-weight: bolder">教育</h3>-->
          <!--<div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>-->
          <!--<p>-->
            <!--<ul style="padding-left: 20px">-->
              <!--<li>2011 ~ 2013 &nbsp; 本科 &nbsp; 上海交通大学</li>-->
            <!--</ul>-->
          <!--</p>-->

          <h3 style="font-weight: bolder">技能</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>计算机技能
                <ul style="padding-left: 20px">
                  <li>语言：汇编、VB、C、JAVA、PHP、Python、JavaScript</li>
                  <li>框架：Laravel、Vue.js</li>
                  <li>系统：Android & CentOS & Ubuntu</li>
                </ul>
              </li>
              <li>其他技能
                <ul style="padding-left: 20px">
                  <li>硬件擅长：电路设计、开关电源、电磁、测量仪器</li>
                  <li>软件擅长：视频通讯、机器人语音对话</li>
                </ul>
              </li>
            </ul>
          </p>

          <h3 style="font-weight: bolder">联系方式</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>邮箱：woshicheyy@sina.com</li>
              <li>主页：
                <a href="http://www.icheyy.top">http://www.icheyy.top</a>
              </li>
            </ul>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.about {
  color: #555;
  line-height: 30px;
  .first {
    text-align: center;
    font-size: 25px;
    padding: 40px 0 40px;
  }
  p {
    padding: 10px 0 10px 20px;
  }
  a {
    color: #00b5ad;
  }
  h3 {
    padding-top: 10px;
  }
}
</style>
