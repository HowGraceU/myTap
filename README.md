# myTap
自己写的一个tap文件
<h3>为什么需要自己写tap文件？</h3>
背景：在做手机端的页面时，使用了scroll事件。在安卓手机中scroll的效果与网页一样，而苹果手机的scroll事件只在scroll停止的时候才触发，而且期间scrollTop是不会改变的。

问题：假如ios的scroll事件一直遵循这个规律也就算了，但是<em>加了scroll的元素或者其父辈元素加了touch相关的事件之后，每次手指拖拽内容都会触发scroll事件</em>，在自制的picker中判断滑块停止的点遇到问题。

那touch相关事件与tap有什么关系呢？
翻了一些手机端的tapjs，发现普遍的做法是在document上添加touchstart和touchend事件来监听是否触发tap事件，所以引如tapjs之后，我们的document就被自动加上了touch相关的事件。

实现：基于jq或者zepto定义了一个类，实现只在想要tap的文件上才加touch相关事件，但这不是事件绑定！

使用：new Tap(obj, callback);
第一个参数传入jq(或zepto)对象或者对象的id，第二个参数是callback