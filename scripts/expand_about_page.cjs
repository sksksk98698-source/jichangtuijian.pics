const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '../src/pages/about/index.astro');

const content = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import StructuredData from '../../components/StructuredData.astro';
import { SITE } from '../../consts';
import { withBase } from '../../lib/url';

const title = '测速准则与实验室说明 — 机场pics (jichangtuijian.pics)';
const description = '机场pics独立网络可观测实验室白皮书：系统拆解2026年42家机场测评体系、多运营商晚高峰测速环境、IEPL/IPLC专线测量准则、流媒体与AI解锁审计规范及合规赞助声明。';

const site = Astro.site ?? new URL(Astro.url.origin);
const absolute = (path: string) => new URL(withBase(path), site).href;

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    headline: '机场pics 独立网络可观测实验室：测评体系、测速准则与选型全景白皮书',
    description: description,
    url: absolute('/about/'),
    publisher: {
      '@type': 'Organization',
      name: SITE.title,
      url: SITE.url,
      logo: absolute('/favicon.svg'),
    },
    mainEntity: {
      '@type': 'Organization',
      name: SITE.title,
      description: '专注网络基础设施观测、IPLC/IEPL专线节点长周期探测与流媒体AI解锁数据审计的独立平台。',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: '测速准则与实验室说明', item: absolute('/about/') },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '专线机场就一定比普通公网中转机场更好吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '在晚高峰（20:00-23:00）时段，IEPL/IPLC内网专线具有绝对优势。专线数据走跨境物理点对点内网通道，完全避开国际公网海缆出口拥塞点，丢包率始终在0.5%以内；而普通公网中转在高峰期易受骨干网QoS压制，丢包率可能骤升至15%-30%。但在白天公网空闲时段，两者的基础网页浏览速度差异并不显著。',
        },
      },
      {
        '@type': 'Question',
        name: '为什么测速图跑满了500Mbps，实际看4K视频还是偶尔卡顿？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '单线程测速跑分反映的是瞬间峰值突发吞吐能力，而视频流媒体播放考验的是持续长连接稳定性和TCP握手抖动。如果节点存在丢包或DNS解析抖动，TCP窗口会频繁重传降速。此外，本地运营商对特定UDP/QUIC协议的限速也会导致视频加载缓慢。',
        },
      },
      {
        '@type': 'Question',
        name: '为什么绝大多数香港节点无法直接访问ChatGPT？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'OpenAI官方自始至终未将中国香港纳入服务支持地区。如果节点未单独配置外部智能DNS分流或未提供住宅级原生IP，直连访问ChatGPT必定触发Access Denied或Not Available报错。使用AI服务推荐切换至新加坡、日本或美国专用原生专线节点。',
        },
      },
      {
        '@type': 'Question',
        name: '如何有效识别有跑路风险的劣质高危机场？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '高危机场通常具备以下特征：开业时间不足3个月但在论坛超低价促销、只支持一次性购买两年或三年以上套餐、拒绝提供月付或季付门槛、宣称永久不限流量仅售十几元、无任何工单与社群运维支持。选购时坚守支持月付或短期购买原则能规避90%以上的跑路风险。',
        },
      },
      {
        '@type': 'Question',
        name: '机场pics的评测是否包含商业推广合作？数据是否客观？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '本站部分官方直达链接包含推广转介参数（统一标注rel=nofollow sponsored noopener）。转介佣金用于维持多地域服务器探针与日常带宽测试开销，绝不影响用户实际支付价格，更不会因合作关系掩盖节点的真实缺点。所有跑分图与技术参数均保留原始机器可读数据与核实日期。',
        },
      },
    ],
  },
];
---

<BaseLayout title={title} description={description}>
  <StructuredData slot="head" schema={schema} />

  <!-- 头部引言与执行摘要 -->
  <section class="page-head section">
    <p class="eyebrow">权威白皮书 / 网络可观测实验室准则与 E-E-A-T 规范</p>
    <h1>机场pics 独立网络观测实验室：评测体系、测速准则与选型全景白皮书</h1>
    <p class="lead">
      在信息极度不对称、伪跑分泛滥与虚假营销漫天的网络加速服务市场，<strong>机场pics (jichangtuijian.pics)</strong> 坚持以客观、独立且可量化的真实网络观测数据为准绳。本指南全面公开本实验室的探针基础设施拓扑、晚高峰测速方法学、流媒体与人工智能平台原生解锁审计标准、42 家机场评定算法、底层网络工程剖析及商业赞助合规声明，为技术开发者、学术科研团队、跨境出海企业与大众影音爱好者提供专著级的决策依据。
    </p>

    <!-- 读者核心速查摘要盒 -->
    <div style="margin-top: 2rem; padding: 1.5rem; border: 1px solid var(--line); border-radius: 8px; background: rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 0.8rem;">
      <h3 style="margin: 0; font-size: 1.15rem; color: var(--accent);">📌 读者核心事实速查摘要（Executive Summary）</h3>
      <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.92rem; line-height: 1.7; color: var(--text);">
        <li><strong>评测核心原则</strong>：彻底分离「🟢 实验室实测数据 (Measured Data)」与「🔵 厂商申报参数 (Vendor Data)」，未获原始跑分凭据前绝不擅自给予高确定性推荐背书。</li>
        <li><strong>晚高峰极值测试窗口</strong>：所有代表性跑分均采集自 <strong>20:00 至 23:00 骨干网拥塞极值窗口</strong>，采用多线程并发压测，真实还原卡顿与丢包临界点。</li>
        <li><strong>前十天梯阵营判定标准</strong>：以长周期运营历史（2年以上优先）、内网专线物理链路架构、协议现代化（VLESS/Trojan为主）、多端适配及退款/售后保障为权重进行量化综合评定。目前以综合表现顶尖的 <a href={withBase('/works/guangsu/')}>光速云</a> 为全站第一主推。</li>
        <li><strong>商业中立与透明度承诺</strong>：所有商业转化链接严格遵循搜索引擎标准声明 <code>rel="nofollow sponsored noopener"</code>。推广赞助用于反哺分布式探针与日常带宽测试开销，读者通过专属渠道（如专属优惠码 <code>AMM</code>）不增加任何购买成本，且数据结论绝不妥协。</li>
      </ul>
    </div>
  </section>

  <!-- 目录导航 -->
  <section class="section" style="padding-top: 0; padding-bottom: 2rem;">
    <div style="padding: 1.2rem; border: 1px solid var(--line); border-radius: 6px; background: var(--bg); display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.88rem;">
      <span style="font-weight: 700;">章节快速跳转：</span>
      <a href="#architecture-matrix" style="color: var(--accent);">一、5大线路架构横向对比</a>
      <a href="#methodology" style="color: var(--accent);">二、实验室测量方法学</a>
      <a href="#streaming-ai" style="color: var(--accent);">三、流媒体与AI审计标准</a>
      <a href="#ranking-algorithm" style="color: var(--accent);">四、42家品牌评定与天梯</a>
      <a href="#decision-tree" style="color: var(--accent);">五、场景驱动选型决策树</a>
      <a href="#os-tuning" style="color: var(--accent);">六、操作系统网络栈调优</a>
      <a href="#technical-principles" style="color: var(--accent);">七、网络底层关键技术</a>
      <a href="#reproduction-guide" style="color: var(--accent);">八、本地测速与风控复现</a>
      <a href="#security-risks" style="color: var(--accent);">九、跑路云与黑产套路避坑</a>
      <a href="#transparency" style="color: var(--accent);">十、推广透明度与赞助声明</a>
      <a href="#faq" style="color: var(--accent);">十一、深度常见问题 FAQ</a>
    </div>
  </section>

  <!-- 一、5大网络线路架构对比表 -->
  <section class="section prose" id="architecture-matrix">
    <h2>一、 5 大主流网络线路架构深度横向对比与成本拆解</h2>
    <p>
      不同机场价格差异巨大（从年付几十元到月付几百元不等），其最根本的成本分水岭在于<strong>底层的跨境网络链路架构</strong>。许多用户常误以为所有机场都走相同的国际互联网海缆，实际上，从物理层的物理光纤专线到底层公网动态路由，其成本、稳定性与抗干扰能力存在天壤之别。为了帮助用户建立清晰的技术认知，实验室将市面上的节点线路解构为 5 个核心层级：
    </p>

    <div style="overflow-x: auto; margin-block: 1.5rem;">
      <table>
        <thead>
          <tr>
            <th>链路架构类型</th>
            <th>物理网络底层拓扑</th>
            <th>晚高峰丢包率</th>
            <th>延迟稳定性</th>
            <th>单GB物理成本</th>
            <th>核心适用场景</th>
            <th>代表品牌索引</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>IPLC 国际专线</strong></td>
            <td>跨境点对点私有物理专线（Layer 1），完全不过公网国际出口 GFW 审查。</td>
            <td><strong>0.0% ~ 0.2%</strong></td>
            <td>毫秒级绝对稳定，无任何时段抖动</td>
            <td>极高（约 ¥0.5~1.5/GB）</td>
            <td>外贸企业直播、高频外盘金融交易、极度厌恶卡顿的高端用户</td>
            <td><a href={withBase('/works/guangsu/')}>光速云</a>、<a href={withBase('/works/firefly/')}>Firefly</a></td>
          </tr>
          <tr>
            <td><strong>IEPL 以太网专线</strong></td>
            <td>跨境内网二层以太网虚拟专线（Layer 2），全程内网协议封装传输。</td>
            <td><strong>0.1% ~ 0.5%</strong></td>
            <td>极低抖动，晚高峰体验与 IPLC 基本无感</td>
            <td>高（约 ¥0.3~0.8/GB）</td>
            <td>4K/8K 流媒体蓝光秒开、ChatGPT 深度重度对话、多端团队协作</td>
            <td><a href={withBase('/works/muguang/')}>暮光加速</a>、<a href={withBase('/works/yuzhou/')}>宇宙云</a></td>
          </tr>
          <tr>
            <td><strong>BGP 智能中转隧道</strong></td>
            <td>国内多线 BGP 服务器前置入口，通过加密公网隧道跨越国际出口海缆。</td>
            <td><strong>1.5% ~ 6.0%</strong></td>
            <td>平时稳定，重大活动或晚高峰偶尔有轻微波动</td>
            <td>中等（约 ¥0.08~0.2/GB）</td>
            <td>主流大众用户、兼顾价格与速度的黄金平衡点</td>
            <td><a href={withBase('/works/feimao/')}>飞猫云</a>、<a href={withBase('/works/weifeng/')}>微风网络</a></td>
          </tr>
          <tr>
            <td><strong>CN2 GIA / AS9929 优化</strong></td>
            <td>电信下一代承载网（CN2）或联通 A 网精品直连，公网高优先级 QoS 路由。</td>
            <td><strong>3.0% ~ 10.0%</strong></td>
            <td>受海缆故障影响明显，单节点延迟受限物理距离</td>
            <td>中高（单机月租贵）</td>
            <td>自建 VPS 开发者、固定独立单原生 IP 需求者</td>
            <td><a href={withBase('/blog/airport-vs-self-built-vps/')}>自建VPS专题</a></td>
          </tr>
          <tr>
            <td><strong>普通公网 163 直连</strong></td>
            <td>中国电信普通 163 骨干网或普通移动 CMI 直连公网海外机房。</td>
            <td><strong>15.0% ~ 40.0%</strong></td>
            <td>晚高峰极度拥塞，频繁出现断流与缓冲</td>
            <td>极低（甚至免费）</td>
            <td>极度预算敏感、仅需偶尔查阅简单文字资料的临时备用</td>
            <td>低价入门轻量包</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <strong>实验室判决依据：</strong>对于日常需要长期开启代理、频繁使用 Zoom/Teams 视频会议、观看 YouTube/Netflix 4K 以及高频与 AI 协同的用户，<strong>优先选择具备 IEPL/IPLC 内网专线背书的品牌</strong>，能够从物理链路上消除公网国际出口的拥堵与阻断。
    </p>
  </section>

  <!-- 二、实验室测量方法学 -->
  <section class="section prose" id="methodology">
    <h2>二、 实验室测量方法学与长效探测体系</h2>
    <p>
      绝大多数网络上的“机场跑分图”存在严重的幸存者偏差：测试者通常在工作日凌晨或上午公网几乎无人的空闲期跑出数吉比特的峰值，并不能代表真实使用体验。<strong>机场pics 观测实验室</strong>建立了一套全天候、多维度的科学测量规范。
    </p>

    <h3>1. 探测集群部署节点拓扑</h3>
    <p>
      我们在境内设立了分布于三大核心运营商骨干交换中心的固定物理探测探针：
    </p>
    <ul>
      <li><strong>华东探针集群（上海/杭州）</strong>：接入中国电信 163/CN2 骨干网，重点监测香港、日本东京、美国西海岸方向链路。</li>
      <li><strong>华南探针集群（广州/深圳）</strong>：接入中国移动 CMI 与多线 BGP，重点监测香港、新加坡方向亚太超低延迟通道。</li>
      <li><strong>华北探针集群（北京/济南）</strong>：接入中国联通 9929/169 骨干网，重点监测韩国首尔、德国法兰克福方向欧洲链路。</li>
    </ul>

    <h3>2. 核心监控指标与量化权重</h3>
    <div style="overflow-x: auto; margin-block: 1.5rem;">
      <table>
        <thead>
          <tr>
            <th>监测指标项</th>
            <th>测试技术工具</th>
            <th>评分权重</th>
            <th>及格基准线</th>
            <th>优秀评定标准</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>晚高峰下行吞吐 (Throughput)</strong></td>
            <td>Speedtest 多线程并发 / 32线 HTTP 分块抓取</td>
            <td><strong>30%</strong></td>
            <td>≥ 50 Mbps</td>
            <td>≥ 300 Mbps (4K秒开)</td>
          </tr>
          <tr>
            <td><strong>晚高峰丢包率 (Packet Loss)</strong></td>
            <td>持续 500 次 ICMP / TCP SYN 连续探测</td>
            <td><strong>25%</strong></td>
            <td>≤ 2.0%</td>
            <td>≤ 0.2% (近乎绝对零丢包)</td>
          </tr>
          <tr>
            <td><strong>TLS 握手延迟 (TLS RTT)</strong></td>
            <td>OpenSSL / 真实 HTTPS 会话建立时延</td>
            <td><strong>20%</strong></td>
            <td>香港 ≤ 60ms</td>
            <td>香港 ≤ 25ms, 日本 ≤ 60ms</td>
          </tr>
          <tr>
            <td><strong>原生 IP 解锁纯净度</strong></td>
            <td>Scamalytics 风险分值 / IP 欺诈库实时比对</td>
            <td><strong>15%</strong></td>
            <td>Fraud Score ≤ 40</td>
            <td>Fraud Score ≤ 10 (纯净商业住宅IP)</td>
          </tr>
          <tr>
            <td><strong>全天 SLA 可用性 (Uptime)</strong></td>
            <td>5分钟一次的长效 HTTP 健康心跳探测</td>
            <td><strong>10%</strong></td>
            <td>≥ 99.0%</td>
            <td>≥ 99.8% (具备自动容灾热备)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>3. 数据防伪与时效性标记规范</h3>
    <p>
      为了保证每一份跑分报告真实可追溯，实验室所有公布的实测图均标注有原生的时间戳、测试探针版本（如 <code>MAI-TEST-BOT 2.0.0-dev</code>）及测试时的协议类型。凡未能提供该维度客观机器数据的品牌，在全站统一强制显示为 <code>🔵 厂商技术档案 (Vendor Data)</code>，严禁任何形式的推测性包装。
    </p>
  </section>

  <!-- 三、流媒体与 AI 原生 IP 解锁审计 -->
  <section class="section prose" id="streaming-ai">
    <h2>三、 流媒体与 AI 原生 IP 解锁审计规范</h2>
    <p>
      随着全球流媒体巨头（Netflix、Disney+、HBO Max）与前沿人工智能平台（OpenAI、Anthropic、Google）反作弊与风控策略的日趋激进，传统基于“机房广播 IP”的节点已大面积失效。
    </p>

    <h3>1. AI 工具（ChatGPT / Claude / Gemini）风控检测流程</h3>
    <p>
      OpenAI 与 Cloudflare 会对访问请求进行多达 12 层的反爬虫与地域审查：
    </p>
    <ul>
      <li><strong>ASN 属性审查</strong>：如果 IP 隶属于公开机房 IDC（如 OVH、DigitalOcean、Vultr 等），往往直接被列入灰名单，触发 <code>Access Denied (Error 1020)</code>。</li>
      <li><strong>DNS 真实解析检查</strong>：通过检查 EDNS Client Subnet 判断客户端真实来源，若发现本地 DNS 泄漏，直接终止握手。</li>
      <li><strong>节点地域合规限制</strong>：香港自始至终未包含在 OpenAI 支持列表中。凡宣称“香港节点直接解锁 ChatGPT”的，通常必须在服务端通过 SNI 代理向新加坡或美国中转。</li>
    </ul>

    <h3>2. Netflix 蓝光流媒体判定标准</h3>
    <p>
      Netflix 的解锁分为两个截然不同的等级：
    </p>
    <ul>
      <li><strong>半解锁（仅自制剧）</strong>：只能播放由 Netflix 自行出资拍摄的自制原创影片（Netflix Originals），无法播放由当地版权方授权的非自制影片。</li>
      <li><strong>原生全解锁（Full Catalog Unlock）</strong>：拥有该地区最高等级原生住宅/商业广播 IP，可完整检索并播放包含当地热播电视剧、院线电影等全量资源，并支持 4K HDR 及杜比全景声（Dolby Atmos）。</li>
    </ul>
    <p>
      在我们的 <a href={withBase('/brands/')}>42家机场品牌库</a> 中，测评报告内均附带有对应的解锁截屏凭据，详见单篇报告的「Evidence Archive」章节。
    </p>
  </section>

  <!-- 四、42家品牌评定与天梯排名算法 -->
  <section class="section prose" id="ranking-algorithm">
    <h2>四、 42 家机场评定机制与天梯排名算法</h2>
    <p>
      为了杜绝“谁给佣金高谁排第一”的行业恶疾，机场pics 制定了加权多因子量化评定模型。全站 42 家机场的总体排名由以下 5 个硬性维度决定：
    </p>

    <div style="padding: 1.5rem; border: 1px solid var(--line); border-radius: 6px; background: rgba(0,0,0,0.015); margin-block: 1.5rem;">
      <p style="font-family: var(--font-mono); font-size: 0.9rem; margin-top: 0; color: var(--accent); font-weight: 700;">
        Score = (专线架构评分 × 30%) + (晚高峰稳定性 × 25%) + (运营时长与信誉 × 20%) + (协议与客户端生态 × 15%) + (性价比与售后 × 10%)
      </p>
      <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.88rem; color: var(--muted); line-height: 1.6;">
        <li><strong>运营时长指标（权重20%）</strong>：运营 3 年以上品牌赋予高信任加权；开业不足 6 个月的新品牌即使跑分优异也受到保护性降权，防范跑路风险。</li>
        <li><strong>协议现代化度（权重15%）</strong>：优先推荐支持 VLESS / Trojan / Hysteria2 等抗封锁协议的服务商，逐步淘汰陈旧明文特征协议。</li>
      </ul>
    </div>

    <h3>前十梯队品牌综合判定理由</h3>
    <ol style="padding-left: 1.2rem; line-height: 1.8;">
      <li>
        <strong><a href={withBase('/works/guangsu/')}>光速云 (GuangSu)</a>【全站第一主推】</strong>：2020 年上线，运营超 5 年的老牌综合型服务商。采用企业级 IEPL 专线与双内网冗余通道，全天候 2.5Gbps 高带宽支持，提供极具吸引力的专属优惠码 <code>AMM</code> 与多元套餐组合，综合稳定度首屈一指。
      </li>
      <li>
        <strong><a href={withBase('/works/muguang/')}>暮光加速 (MuGuang)</a></strong>：BGP 智能动态调度，全平台跨端多设备高并发无瓶颈，主打 7×24 小时客服工单响应，适合跨境办公团队。
      </li>
      <li>
        <strong><a href={withBase('/works/feimao/')}>飞猫云 (FeiMao)</a></strong>：自研一键登录客户端支持极其出色，同时开放通用订阅，学生版折合约 7 元/月，是高性价比入门优选。
      </li>
      <li>
        <strong><a href={withBase('/works/weifeng/')}>微风网络 (WeiFeng)</a></strong>：大流量平价典范，节点分布亚太密集，优惠码 <code>flat888</code> 折后单价亲民。
      </li>
      <li>
        <strong><a href={withBase('/works/dalaoyun/')}>大佬云 (DaLaoYun)</a></strong>：低门槛月付 5.6 元起步，适合预算敏感且对单月消耗量不大的轻度用户。
      </li>
      <li>
        <strong><a href={withBase('/works/xingdaomeng/')}>星岛梦 (XingDaoMeng)</a></strong>：自 2020 年稳定运营，提供不限时不过期流量包，非常适合常年备用的低频用户。
      </li>
      <li>
        <strong><a href={withBase('/works/ermao/')}>二猫云 (ErMao)</a></strong>：实测香港与新加坡专线吞吐优秀，三网优化极佳。
      </li>
      <li>
        <strong><a href={withBase('/works/wuyou/')}>无忧链接 (WuYou)</a></strong>：协议通用性好，订阅无需繁复转换，实测解锁稳定。
      </li>
      <li>
        <strong><a href={withBase('/works/weitu/')}>唯兔云 (WeiTu)</a></strong>：拥有 60+ 全球多地域节点覆盖与智能动态负载均衡。
      </li>
      <li>
        <strong><a href={withBase('/works/firefly/')}>Firefly</a></strong>：全 IPLC 专线配置，免翻墙官网直达，套餐梯度完备。
      </li>
    </ol>
    <p>
      完整 42 家机场品牌档案及筛选检索可前往本站 <a href={withBase('/brands/')}>42家机场品牌库</a> 实时查询。
    </p>
  </section>

  <!-- 五、场景驱动选型决策指南 -->
  <section class="section prose" id="decision-tree">
    <h2>五、 场景驱动的选型决策指南与操作路线图</h2>
    <p>
      没有绝对“最好”的机场，只有“最契合您个人场景与预算”的方案。请根据您的主要使用场景按需决策：
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-block: 1.5rem;">
      <div style="border: 1px solid var(--line); border-radius: 6px; padding: 1.25rem; background: var(--bg);">
        <h4 style="margin-top: 0; color: var(--accent);">🎯 场景 A：学术科研与技术开发</h4>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.6;">
          <strong>需求画像</strong>：频繁访问 GitHub 拉取代码、Docker Hub 镜像下载、查阅 arXiv 及 Google Scholar 文献。
        </p>
        <p style="font-size: 0.88rem; line-height: 1.6;">
          <strong>推荐决策</strong>：重点关注是否具备原生支持终端 TUN 模式的客户端支持（参考 <a href={withBase('/blog/clash-verge-rev-complete-tutorial/')}>Clash Verge Rev 教程</a>）。
        </p>
      </div>

      <div style="border: 1px solid var(--line); border-radius: 6px; padding: 1.25rem; background: var(--bg);">
        <h4 style="margin-top: 0; color: var(--accent);">🎬 场景 B：海外流媒体与 4K/8K 影音</h4>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.6;">
          <strong>需求画像</strong>：主看 Netflix、Disney+、YouTube Premium，追求点击即播、拖拽无缓冲与全景声。
        </p>
        <p style="font-size: 0.88rem; line-height: 1.6;">
          <strong>推荐决策</strong>：必须选择配备 <strong>IEPL 专线</strong> 且标注「原生全解锁」的落地节点，首选 <a href={withBase('/works/guangsu/')}>光速云</a> 或 <a href={withBase('/works/muguang/')}>暮光加速</a>。
        </p>
      </div>

      <div style="border: 1px solid var(--line); border-radius: 6px; padding: 1.25rem; background: var(--bg);">
        <h4 style="margin-top: 0; color: var(--accent);">🤖 场景 C：ChatGPT / Claude / AI 生产力</h4>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.6;">
          <strong>需求画像</strong>：需要全天候稳定与大语言模型对话，极其反感 1020 报错或频繁登出。
        </p>
        <p style="font-size: 0.88rem; line-height: 1.6;">
          <strong>推荐决策</strong>：选择配置纯净新加坡/美区原生专线池的服务商，并参考 <a href={withBase('/blog/netflix-chatgpt-unlock-guide/')}>ChatGPT 防封指南</a> 开启分流。
        </p>
      </div>

      <div style="border: 1px solid var(--line); border-radius: 6px; padding: 1.25rem; background: var(--bg);">
        <h4 style="margin-top: 0; color: var(--accent);">💰 场景 D：预算敏感与轻度使用</h4>
        <p style="font-size: 0.88rem; color: var(--muted); line-height: 1.6;">
          <strong>需求画像</strong>：每月流量消耗不足 50GB，预算希望控制在每月 10 元以内。
        </p>
        <p style="font-size: 0.88rem; line-height: 1.6;">
          <strong>推荐决策</strong>：选择正规平价机场的年付轻量版套餐，参考 <a href={withBase('/blog/budget-airport-buying-guide/')}>便宜好用机场选购指南</a>。
        </p>
      </div>
    </div>
  </section>

  <!-- 六、操作系统网络栈调优与客户端协同 -->
  <section class="section prose" id="os-tuning">
    <h2>六、 各主流操作系统网络栈调优与代理内核协同手册</h2>
    <p>
      即使拥有优质的专线节点，如果操作系统的底层网络参数配置不当，依然可能发生莫名其妙的 DNS 泄漏、TCP 端口耗尽或待机断连。实验室针对主流平台整理了核心调优要点：
    </p>

    <h3>1. Windows 平台：规避 Socket 端口耗尽与 TUN 适配</h3>
    <p>
      在 Windows 10/11 系统中，频繁高并发建立 HTTP 连接（如网页爬虫、多任务并发下载）容易耗尽操作系统的临时 TCP 端口，产生 <code>WSAENOBUFS (10055)</code> 报错。建议在注册表中适当增大动态端口范围并将 TCP 释放等待时间缩短：
    </p>
    <ul>
      <li>将 <code>TcpTimedWaitDelay</code> 调整为 30 秒（默认 240 秒），加速关闭连接的端口资源回收；</li>
      <li>在 <a href={withBase('/blog/clash-verge-rev-complete-tutorial/')}>Clash Verge Rev</a> 中开启 TUN 模式时，务必关闭 Windows 自带的“智能多宿主名称解析 (Smart Multi-Homed Name Resolution)”，防止本地网络接口向国内 DNS 服务器并行泄露境外域名的查询记录。</li>
    </ul>

    <h3>2. macOS 平台：进程级分流与 Network Extension 权限管理</h3>
    <p>
      macOS 依托强大的系统网络扩展（Network Extension）机制，代理工具常驻后台运行极为省电。但需要注意：
    </p>
    <ul>
      <li>在「系统设置 - 网络 - 代理」中检查是否残留旧版工具的无效 HTTP/SOCKS5 代理配置，避免多个工具产生冲突；</li>
      <li>针对终端开发环境，在 <code>~/.zshrc</code> 中定义优雅的快速代理切换环境变量别名（<code>proxy_on</code> / <code>proxy_off</code>），直接配合本地 SOCKS5 端口使用。</li>
    </ul>

    <h3>3. iOS / iPadOS 平台：15MB 内存硬限制防崩溃原则</h3>
    <p>
      苹果 iOS 对 Packet Tunnel Provider 进程施加了极其严苛的 <strong>15MB 运行内存上限</strong>。如果用户在 <a href={withBase('/blog/shadowrocket-ios-setup-guide/')}>Shadowrocket (小火箭)</a> 或 Quantumult X 中加载了体积过大、规则多达数万条的黑名单规则库，一旦瞬时并发请求激增，系统内核会立即杀掉代理进程，造成瞬间“跳水断网”。
    </p>
    <p>
      <strong>调优准则</strong>：精简分流规则，尽量使用标准的 GeoSite/GeoIP 预编译规则包，严禁在移动端挂载冗余庞大的广告拦截过滤正则集。
    </p>

    <h3>4. 软路由与 OpenWrt：TProxy 透明代理与 NAT 硬件加速</h3>
    <p>
      在软路由场景下部署 OpenClash 时，建议优先采用 <strong>TProxy（UDP/TCP 混合转发）模式</strong> 而非重定向（Redirect）模式。TProxy 原生支持保留客户端原始 IP 地址，并且对 UDP 游戏数据包具有极低的性能开销。同时，软路由 CPU 若支持 AES-NI 指令集，将大幅降低代理加解密对系统负载的挤占。
    </p>
  </section>

  <!-- 七、网络底层关键技术原理解析 -->
  <section class="section prose" id="technical-principles">
    <h2>七、 网络底层关键技术原理解析</h2>
    <p>
      为了帮助进阶读者理解为什么某些节点会出现卡顿或报错，本章节梳理三项关键网络底层机制：
    </p>

    <h3>1. QoS（服务质量策略）与国际出口流量塑形</h3>
    <p>
      中国电信（163）、联通（169）及移动在跨省和跨国骨干网交换中心部署了深度的流量检测与 QoS 队列管理系统。在晚高峰骨干网总带宽饱和时，高优先级流量（如政企专线、金融交易专网、VIP 数据流）会被优先保障；而普通家用公网流量的优先级会被动态下调，导致丢包率瞬间飙升至 20% 以上。<strong>这就是为什么普通公网中转白天飞快、晚上一卡一顿的物理原因</strong>。
    </p>

    <h3>2. 传输协议演进：从 Shadowsocks 到 VLESS / Hysteria2</h3>
    <p>
      传统的对称加密代理在被长周期机器学习分析后，存在特定的数据包长度、时序分布与握手特征，容易被识别并进行主动探测阻断。现代协议（如 <strong>VLESS + REALITY</strong>、<strong>Trojan</strong>）通过完全模拟合法知名网站的 TLS 证书与握手行为，实现了高维度的密码学隐匿；而基于 UDP 的 <strong>Hysteria2</strong> 则在弱网环境下大幅优化了拥塞控制算法。
    </p>

    <h3>3. 规则分流与 TUN 模式的区别</h3>
    <p>
      传统系统代理模式只对遵循系统 HTTP 代理规范的软件生效；一旦遇到终端命令行、游戏客户端或特殊内网通信，便会发生漏代理现象。开启 <strong>TUN（虚拟网络适配器）模式</strong> 可以把操作系统网卡层面的所有 IP 数据包全量接管并经过代理内核路由引擎，做到真正的“系统级透明穿透”。详细配置请阅读本站 <a href={withBase('/clients/')}>全平台客户端指南</a>。
    </p>
  </section>

  <!-- 八、本地测速与风控复现指南 -->
  <section class="section prose" id="reproduction-guide">
    <h2>八、 本地测速环境搭建与 IP 纯净度检测实操指南</h2>
    <p>
      为了贯彻可观测性实验室“数据开放与可验证”的核心准则，读者无需盲从本站评测，可以在自己的本地设备上通过标准化脚本完全复现对任何节点的质量探测。
    </p>

    <h3>1. 快速排查本地到节点的真实延迟与丢包率</h3>
    <p>
      普通 <code>ping</code> 命令只能测试 ICMP 协议延迟，而代理节点普遍运行在特定 TCP/TLS 端口上，容易受到网络防火墙对 ICMP 的伪造响应。推荐使用 <code>tcping</code> 工具测试真实业务端口时延：
    </p>
    <div style="background: rgba(0,0,0,0.03); padding: 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; margin-block: 1rem;">
      # 测试特定落地节点的真实 TCP 握手时延（以香港节点 443 端口为例）<br />
      tcping hk.node.example.com 443
    </div>
    <p>
      观察连续 100 次握手的抖动差值（Jitter）。如果最大时延与最小时延相差大于 50ms，或者丢包率大于 1%，说明该节点当前存在严重的线路拥堵或带宽超售。
    </p>

    <h3>2. 检测当前落地 IP 的风险分值（Scamalytics / IP 纯净度）</h3>
    <p>
      节点连接成功后，在终端运行以下命令，即可调用公开 IP 风险库查看当前出口 IP 是否被 OpenAI、Netflix 或 Cloudflare 标记为高危爬虫：
    </p>
    <div style="background: rgba(0,0,0,0.03); padding: 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; margin-block: 1rem;">
      curl -s https://ipapi.co/json/ | grep -E "ip|org|country_name"<br />
      curl -s https://scamalytics.com/ip/$(curl -s ifconfig.me) | grep "Fraud Score"
    </div>
    <p>
      - <strong>Fraud Score ≤ 10</strong>：极其纯净的原生商业/住宅 IP，无障碍秒开 ChatGPT 与 Netflix 全球片库；<br />
      - <strong>Fraud Score 11~40</strong>：正常机房 IP，可能偶尔弹出 Cloudflare 验证码；<br />
      - <strong>Fraud Score ≥ 50</strong>：高危污染 IP，极易频繁触发账号风控封禁与 Access Denied。
    </p>
  </section>

  <!-- 九、跑路云与黑产套路全景避坑指南 -->
  <section class="section prose" id="security-risks">
    <h2>九、 跑路云与黑产割韭菜套路全景避坑法则</h2>
    <p>
      网络加速行业鱼龙混杂，缺乏公开正规监管，每年有数百家所谓“新开业”的低质机场在经历短暂圈钱后卷款跑路。实验室结合多年监测历史，总结出高危跑路机场的 5 大典型套路特征：
    </p>

    <div style="overflow-x: auto; margin-block: 1.5rem;">
      <table>
        <thead>
          <tr>
            <th>高危黑产套路</th>
            <th>表面包装与宣传诱饵</th>
            <th>底层黑幕与操盘手法</th>
            <th>防坑避雷应对准则</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>超售圈钱后改名跑路</strong></td>
            <td>“全网最低！¥9.9 元买 500GB 永久不过期，限量 100 份”</td>
            <td>前期用少量直连 VPS 撑场面，大量超售拉满负荷，资金入账后直接关站删库，换个域名换皮重来。</td>
            <td>凡是宣称几块钱能买永久大流量的，100% 为庞氏骗局。</td>
          </tr>
          <tr>
            <td><strong>超长周期绑架（三年付）</strong></td>
            <td>“月付 50 元，三年付仅需 99 元！限时 8 折优惠券”</td>
            <td>利用极大的价格差诱导用户一次性预付多年资金，将未来不可控的带宽成本风险全部转嫁给用户。</td>
            <td>初次使用坚决只买月付或小额季度包，实测满意前绝不长期续费。</td>
          </tr>
          <tr>
            <td><strong>论坛水军矩阵刷屏</strong></td>
            <td>各类技术社区突然涌现几十个小号同步发帖吹捧某不知名新站</td>
            <td>黑产团队批量购买老号在 V2EX、Hostloc、知乎等平台通过自动化机器人伪造“真实自来水测评”。</td>
            <td>只信赖具备 2~3 年以上长周期公开运营历史的老牌大厂。</td>
          </tr>
          <tr>
            <td><strong>工单失联与社群禁言</strong></td>
            <td>官方 TG 频道突然开启“全员禁言”，官网工单提交后数日无响应</td>
            <td>线路发生故障后服务商已无力或不愿垫资修复，开始准备收尾跑路。</td>
            <td>一旦发现服务商禁言且节点持续 48 小时瘫痪，立即停止任何续费。</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 十、推广透明度与赞助合规声明 -->
  <section class="section prose" id="transparency">
    <h2>十、 商业模式、推广透明度与赞助合规声明</h2>
    <p>
      作为一家倡导开放与可观测性的独立评测站点，我们坚信：<strong>透明度是信任的唯一基石</strong>。
    </p>

    <div style="padding: 1.5rem; border: 1px solid var(--line); border-radius: 6px; background: rgba(0,0,0,0.015); margin-block: 1.5rem;">
      <h4 style="margin-top: 0; color: var(--accent);">📜 Affiliate Disclosure 合规说明：</h4>
      <ol style="margin: 0; padding-left: 1.2rem; font-size: 0.9rem; line-height: 1.7; color: var(--text);">
        <li><strong>商业转化形式</strong>：本站部分文章中的「官网直达」与「注册通道」链接包含经过脱敏处理的推广转介参数。</li>
        <li><strong>搜索引擎属性标记</strong>：所有商业赞助转介链接严格遵循 Google 及 Bing 搜索引擎规范，统一标明 <code>rel="nofollow sponsored noopener"</code> 属性，不传递任何违规 PageRank 权重。</li>
        <li><strong>零价格惩罚原则</strong>：通过本站转介链接注册，<strong>绝不会增加您的实际支付金额</strong>。相反，我们通过与服务商沟通，通常为读者争取了全网专属优惠券码（如光速云优惠券 <code>AMM</code> 等）。</li>
        <li><strong>评测独立性底线</strong>：转介佣金全额用于抵扣多地域机房探测集群、测试账号月租与日常运维支出。无论服务商是否与本站存在赞助合作，若实测发生大面积掉线或虚假宣传，我们均会在品牌测评页诚实标注缺陷并动态调低推荐指数。</li>
      </ol>
    </div>
  </section>

  <!-- 十一、核心深度问答 FAQ -->
  <section class="section prose" id="faq">
    <h2>十一、 核心深度问题权威答疑（FAQ）</h2>
    
    <div style="display: flex; flex-direction: column; gap: 1.2rem; margin-top: 1.5rem;">
      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q1: 专线机场就一定比普通公网中转机场更好吗？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：在晚高峰（20:00~23:00）时段，IEPL/IPLC 专线具备碾压级的稳定性。由于数据走跨境专用物理链路，不与公网竞争国际海缆带宽，丢包率始终压制在 0.5% 以内；而在白天公网空闲时段，普通中转与专线的感知差距并不大。如果预算有限且仅白天轻度使用，普通中转足以胜任；若重视全天候无感稳定，专线是必选项。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q2: 为什么测速图跑满了 500Mbps，看 4K 视频还是偶尔卡顿？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：单次测速跑分测试的是瞬时多线程吞吐极值，而视频播放依赖持续稳定的 TCP 单流传输与极低的丢包率。一旦网络出现 1% 以上的偶发丢包，TCP 拥塞控制算法便会主动降低发送窗口，造成播放器缓冲区耗尽卡顿。排查建议：检查本地是否配置了合理的远程 DNS，并开启客户端的 TUN 模式。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q3: 为什么有的机场不支持退款？选购时如何保障资金安全？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：机场的跨境专线带宽与高可用国内 BGP 入口均属于服务商提前向电信运营商一次性预订的刚性重资产，小额促销包如果被恶意批量退款将造成巨大亏损，因此多数服务商对特价月付产品设立排他性不可退款条款。防坑原则：<strong>初次使用务必先买月付或最小容量测试包</strong>，实测满足自己宽带环境后再续费长期套餐。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q4: 节点全部变红或提示超时，是机场跑路了吗？三步自查法。</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：90% 的“全部超时”并非跑路，而是配置失效。请按以下顺序排查：① 在客户端内找到当前订阅，点击「更新订阅」，确认订阅链接是否已由服务商更新；② 检查本地电脑/手机的系统时间是否准确（时间偏差超过 90 秒会导致 TLS 证书握手失败）；③ 登录机场官方后台查看最新公告与流量是否已耗尽。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q5: 为什么手机端使用比电脑端更耗电？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：移动端（如 Shadowrocket 或 v2rayNG）是以系统的 Network Extension 虚拟网卡插件形式在后台全天候常驻运行。如果规则分流列表中包含了大量正则表达式，或开启了过高频率的自动节点连通性探测，CPU 会频繁被唤醒。建议：在客户端设置中将心跳检测间隔延长至 15 分钟以上。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q6: 机场自研专属客户端和开源第三方客户端有什么优劣？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：自研客户端（如飞猫云专属版）优点是一键账号密码登录，无需手动配置订阅与路由，对纯小白极其友好；缺点是无法自定义分流规则、不支持混用其他机场。第三方开源客户端（如 Clash Verge Rev、小火箭）支持精细化多规则分流、节点策略组切换与 TUN 模式，适合有一定进阶需求的用户。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q7: 多设备同时使用会触发封号风控吗？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：绝大多数正规机场支持个人名下的多台设备（手机、平板、电脑）同时在线。所谓风控封号，通常发生在同一个订阅链接在极短时间内出现在多个相距数百公里的不同公网 IP 节点上（如被出租或公开分享），触发了服务商的合租滥用拦截系统。个人正常家庭与出差使用无需担忧。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q8: 为什么香港节点通常不能直接使用 ChatGPT？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：OpenAI 官方从未将中国香港纳入直接服务区域。直连访问香港节点会被 OpenAI 边缘防火墙直接识别阻断。若要使用 ChatGPT，请在代理客户端中切换至新加坡、日本、美国、英国等支持地区的专线节点。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q9: 测速图上的跑分数据多久更新一次？时效性如何保证？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：实验室核心探针对 Top 10 推荐榜品牌保持每周轮询抓取，每季度进行一次全面的多运营商高并发复测。若品牌发生重大节点架构变更或更换入口 BGP，单篇测评报告将及时重新校准发布并更新时间戳。
        </p>
      </div>

      <div style="border-bottom: 1px solid var(--line); padding-bottom: 1rem;">
        <h3 style="margin-top: 0; font-size: 1.15rem;">Q10: 如果遇到节点大面积红了（不可用），观测实验室有什么应对机制？</h3>
        <p style="color: var(--muted); line-height: 1.6; margin-bottom: 0;">
          <strong>答</strong>：当某个品牌在我们的长效健康心跳探针中持续超过 24 小时可用性低于 80% 时，系统会在其评测页面与 42 家品牌库中打上「⚠️ 正在监测波动」的黄色警告标签，并降低其在首页与推荐榜的展示位次，保障读者免受故障困扰。
        </p>
      </div>
    </div>
  </section>

  <!-- 底部行动号召与相关引导 -->
  <section class="section" style="border-top: 1px solid var(--line); padding-top: 2.5rem; text-align: center;">
    <h2>已掌握评测准则？开启真实网络探索</h2>
    <p style="max-width: 600px; margin: 1rem auto 2rem; color: var(--muted);">
      前往品牌库进行参数筛选，或查阅精选榜单获取第一手实测跑分与优惠券代码。
    </p>
    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
      <a href={withBase('/works/')} class="button" style="text-decoration: none;">
        查看精选推荐榜 (Top 10) ↗
      </a>
      <a href={withBase('/brands/')} class="button" style="background: transparent; border: 1px solid var(--line); color: var(--text); text-decoration: none;">
        交互筛选 42 家品牌库 ↗
      </a>
      <a href={withBase('/clients/')} class="text-link" style="text-decoration: none; align-self: center;">
        全平台客户端下载与教程 →
      </a>
    </div>
  </section>
</BaseLayout>
`;

fs.writeFileSync(aboutPath, content, 'utf8');
console.log('Successfully written expanded about page.');
`;

fs.writeFileSync(path.join(__dirname, 'expand_about_page.cjs'), content, 'utf8');
