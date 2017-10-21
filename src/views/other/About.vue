<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="5">
        <div class="about">
          <p class="first">关于</p>
          <h3 style="font-weight: bolder">社区</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p style="text-align:justify">
            内容
            <br>
          </p>

          <h3 style="font-weight: bolder">兴趣爱好</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            编程 &nbsp; Web开发 &nbsp; 深度学习 &nbsp; 小制作
          </p>

          <h3 style="font-weight: bolder">个人标签</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            车芸艺 &nbsp; 男 &nbsp; 90前技术仔 &nbsp; 生化危机脑残粉 &nbsp; 现居于上海
          </p>

          <h3 style="font-weight: bolder">教育</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>2010 ~ 2014 &nbsp; 本科 &nbsp; 上海交通大学</li>
            </ul>
          </p>

          <h3 style="font-weight: bolder">技能</h3>
          <div style="width:100%; border-top:1px solid #ddd; clear:both;"></div>
          <p>
            <ul style="padding-left: 20px">
              <li>计算机技能
                <ul style="padding-left: 20px">
                  <li>语言：汇编、VB、C、JAVA、PHP、Python、JavaScript</li>
                  <li>框架：Laravel、Vue.js、Keras</li>
                  <li>系统：CentOS & Ubuntu</li>
                </ul>
              </li>
              <li>其他技能
                <ul style="padding-left: 20px">
                  <li>擅长：</li>
                  <li>模拟软件：</li>
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