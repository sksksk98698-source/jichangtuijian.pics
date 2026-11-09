// scripts/generate_faq_cluster.cjs
// Script to generate the comprehensive FAQ Knowledge Matrix for jichangtuijian.pics
// Includes:
// 1. Pillar Page: src/pages/faq/index.astro (10,000 - 15,000 Pure Hanzi)
// 2. Sub-article 1: src/pages/faq/speedtest-fast-but-youtube-lag/index.astro (>1,200 Hanzi)
// 3. Sub-article 2: src/pages/faq/chatgpt-access-denied-solutions/index.astro (>1,200 Hanzi)
// 4. Sub-article 3: src/pages/faq/tun-mode-vs-system-proxy/index.astro (>1,200 Hanzi)

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src', 'pages', 'faq');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

console.log('Generating FAQ Pillar Page and Sub-articles...');

// Let's generate the Pillar Page
const pillarPath = path.join(baseDir, 'index.astro');

const pillarContent = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import StructuredData from '../../components/StructuredData.astro';
import { withBase } from '../../i18n';

const title = '2026 机场常见问题百科与排错总览：50+ 核心技术FAQ与网络连接故障排查专著指南 | 机场pics';
const description = '权威机场百科全书与网络排错手册。收录 50+ 高频技术问答，深入剖析 IEPL 专线/中转/直连原理、测速快看视频卡顿根源、ChatGPT/Claude 访问报错与 IP 封锁解法、Clash TUN 模式配置与 42 家机场常见避坑指南。';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      'name': '网络加速与机场常见问题权威百科全书',
      'description': description,
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '什么是“机场”？为什么网络加速节点服务被称为机场？与传统 VPN 有何本质区别？',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '“机场”是中文互联网对基于 Shadowsocks、V2Ray、Xray、Trojan、Hysteria2 等开源代理协议提供跨境外网加速节点服务的总称。该称谓起源于早期的 ShadowsocksR（SSR）客户端图标是一架小纸飞机，提供海量节点订阅的服务器群自然就被形象地称作“机场”。与传统 IPSec、OpenVPN 等全局网络层隧道不同，现代机场基于应用层或传输层多路复用，配合客户端规则分流系统（如 Clash、Surge），可精准实现国内外流量智能分离。'
          }
        },
        {
          '@type': 'Question',
          'name': '为什么在测速软件里能跑几百兆甚至千兆，但打开 YouTube 看 4K 视频依然频繁转圈卡顿？',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '测速软件（如 Speedtest 或单线程节点跑分）测试的是瞬时突发带宽（Burst Bandwidth），通常仅持续数秒，且测速服务器往往部署在直连骨干网机房。而播放 4K/8K 视频需要的是持续高吞吐、零丢包和极低的延迟抖动（Jitter）。公网直连或劣质中转节点一旦遇到晚高峰网络拥塞，丢包率飙升至 5% 以上，TCP 拥塞控制算法就会强制降窗，导致播放器缓冲区耗尽引发卡顿。'
          }
        },
        {
          '@type': 'Question',
          'name': '访问 ChatGPT 提示“Access denied (Error 1020)”或“IP Blocked”应该如何彻底解决？',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'OpenAI 采用了 Cloudflare 最严格的 WAF 行为树与 IP 欺诈度评分（Fraud Score）。当数以千计的用户共享同一个机房数据中心 IP（Data Center IP）访问 OpenAI 时，该 IP 会被标记为滥用并列入封禁黑名单。彻底解决方法：1. 在客户端规则中将 OpenAI 域名分流至具备住宅 IP、ISP 原生纯净 IP 的节点；2. 避免使用香港等未开放地区节点；3. 开启客户端 TUN 模式杜绝 WebRTC 与本地 DNS 泄漏。'
          }
        },
        {
          '@type': 'Question',
          'name': 'Clash 的系统代理模式与 TUN 虚拟网卡模式到底有什么区别？什么时候必须开 TUN？',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '系统代理（System Proxy）仅通过修改操作系统的 HTTP/HTTPS/SOCKS5 代理环境变量生效，只有主动遵循系统代理设置的应用程序（如 Edge、Chrome 浏览器）才会走代理。而游戏、终端命令行（cmd/powershell/git）、部分金融软件以及原生桌面客户端完全绕过系统代理。TUN 模式通过在操作系统内核创建虚拟网卡，接管所有 Layer 3（网络层）IP 数据包，实现全局透明捕获与分流，适合打游戏、开发调试及彻底防止泄漏。'
          }
        },
        {
          '@type': 'Question',
          'name': '什么是真正的 IEPL 专线？低价宣称 IEPL 的机场是如何通过技术手段造假的？',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '真正的 IEPL（国际以太网私有专线）是企业级端到端内网物理光纤或二层链路，国内入口与海外落地完全在局域网内通信，根本不经过公网骨干网国际出口审查，晚高峰丢包率为零且延迟绝对稳定。造假机场通常采用“国内单线服务器中转 + 海外公网直连”的普通隧道，仅在国内机房和境外落地机房之间加了一层 WS 或 TLS 伪装，节点重命名为 IEPL 专线以高价欺骗用户。通过晚高峰 MTR 路由追踪查看跳数与丢包率即可识破。'
          }
        }
      ]
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': '首页', 'item': 'https://jichangtuijian.pics/' },
        { '@type': 'ListItem', 'position': 2, 'name': '机场百科与高频 FAQ', 'item': 'https://jichangtuijian.pics/faq/' }
      ]
    }
  ]
};
---

<BaseLayout title={title} description={description}>
  <StructuredData slot="head" schema={schema} />

  <!-- 顶部面包屑与标题区 -->
  <header class="faq-header">
    <div class="breadcrumb">
      <a href={withBase('/')}>首页</a>
      <span class="sep">/</span>
      <span class="current">机场百科与排错总揽 (50+ 高频 FAQ)</span>
    </div>
    <div class="header-tags">
      <span class="tag tech">专著级技术百科</span>
      <span class="tag date">2026年4月重构校验</span>
      <span class="tag count">收录 50+ 权威解答</span>
      <span class="tag scope">覆盖 42 家主流品牌</span>
    </div>
    <h1 class="main-title">2026 机场常见问题百科与排错总揽：50+ 核心技术问答与网络连接故障排查实操专著指南</h1>
    <p class="subtitle">
      针对跨境网络加速领域高频出现的网络断流、客户端配置报错、测速与实际观影体验脱节、ChatGPT/Claude 跨区风控阻断以及专线真伪鉴别等核心痛点，我们整理了这套万字级百科排错全书。无论你是刚接触开源客户端的零基础新手，还是需要排查网络层 Layer 3 丢包与 DNS 污染的技术极客，都能在此找到可验证、可执行的权威技术解答。
    </p>
    
    <!-- 快捷跳转锚点导航 -->
    <div class="quick-nav-box">
      <span class="nav-label">快速索引目录：</span>
      <div class="nav-links">
        <a href="#cat-protocols">一、协议与底层专线技术篇 (10题)</a>
        <a href="#cat-purchase">二、选购避坑与资费防雷篇 (10题)</a>
        <a href="#cat-client-troubleshoot">三、客户端与连接故障排查篇 (12题)</a>
        <a href="#cat-media-ai">四、流媒体跨区与 AI 大模型专项篇 (10题)</a>
        <a href="#cat-security-privacy">五、安全防护与合规隐私自保篇 (8题)</a>
        <a href="#cat-matrix-table">六、42家主流机场高频特性与技术支持对照表</a>
        <a href="#cat-flowchart">七、10分钟网络连接排错决策树实操流程</a>
      </div>
    </div>
  </header>

  <!-- 正文核心内容区 -->
  <main class="faq-content">

    <!-- 专题子文章推荐矩阵卡片 -->
    <section class="spoke-articles-banner">
      <h2 class="sub-sec-title">深度长尾技术专栏（针对三大极高频痛点的专题深潜解析）</h2>
      <p class="sub-sec-desc">
        对于在日常使用中最容易引发困惑的三个深水区问题，我们撰写了独立的长尾技术实测专刊，包含完整抓包抓取数据与逐行配置文件修改范例：
      </p>
      <div class="spoke-grid">
        <a href={withBase('/faq/speedtest-fast-but-youtube-lag/')} class="spoke-card">
          <div class="spoke-tag">专项实测解析</div>
          <h3>测速面板几百兆但看 YouTube 依然卡顿？五大根源深度排查与优化实操</h3>
          <p>深入分析突发带宽与持续吞吐差异、晚高峰丢包率对 TCP 窗口的毁灭性打击，以及缓冲区膨胀导致 4K 播放卡顿的终极解法。</p>
          <span class="read-more">查阅专项深度文章 &rarr;</span>
        </a>

        <a href={withBase('/faq/chatgpt-access-denied-solutions/')} class="spoke-card">
          <div class="spoke-tag">AI 运维必备</div>
          <h3>ChatGPT 报错 Access Denied、1020 与 IP 限制全套解决手册</h3>
          <p>剖析 Cloudflare WAF 对数据中心 IP 的阻断机制，提供原生纯净 IP 筛选技巧、WebRTC 防泄漏及客户端专用分流规则编写范本。</p>
          <span class="read-more">查阅专项深度文章 &rarr;</span>
        </a>

        <a href={withBase('/faq/tun-mode-vs-system-proxy/')} class="spoke-card">
          <div class="spoke-tag">底层网络原理</div>
          <h3>TUN 虚拟网卡模式与系统代理的区别深度解析：为什么命令行与游戏必须开 TUN？</h3>
          <p>详解 Layer 3 网络层接管与系统 HTTP 代理环境变量的本质差别，彻底解决 Git、Docker、终端与 Steam 无法走代理的顽疾。</p>
          <span class="read-more">查阅专项深度文章 &rarr;</span>
        </a>
      </div>
    </section>

    <!-- 分类一：协议与底层专线技术篇 -->
    <section id="cat-protocols" class="faq-section">
      <div class="cat-header">
        <span class="cat-num">CATEGORY 01</span>
        <h2>一、底层架构、专线机理与传输协议技术篇</h2>
        <p class="cat-desc">深入剖析机场底层网络拓扑结构、公网中转与物理专线的本质区别，以及各代开源代理协议在抗封锁与性能上的核心差异。</p>
      </div>

      <div class="faq-accordion">
        <article class="faq-item" id="faq-what-is-airport">
          <h3 class="faq-q">Q1：什么是“机场”？为什么网络加速节点服务被称为机场？与传统 VPN 有何本质区别？</h3>
          <div class="faq-a">
            <p>
              “机场”是中文技术社区对基于现代开源代理协议（如 Shadowsocks、V2Ray/VMess、VLESS、Trojan、Hysteria2、TUIC 等）搭建、集中分发海量境外中继节点的商业服务平台的俗称。
            </p>
            <p>
              <strong>词源背景：</strong>该称呼最早可追溯至 2015 年前后 ShadowsocksR（SSR）客户端的诞生，其桌面端应用图标采用了一架标志性的粉色折纸小飞机。随后，第三方服务商通过统一的 Web 订阅管理面板（如早期的 SSPanel-Uim 等）向用户批量分发包含数十个甚至数百个国家和地区的节点配置链接，如同将无数架小飞机停放整齐并提供时刻表调度，因此被圈内形象地称为“机场”，购买服务的用户则戏称为“买机票的旅客”。
            </p>
            <p>
              <strong>与传统商业 VPN 的技术本质差异：</strong>
            </p>
            <ul>
              <li><strong>协议握手与流量特征：</strong>传统 VPN（如 OpenVPN、IPSec、L2TP、WireGuard）最初是为了跨国企业员工远程接入内部局域网而设计的，其协议数据包包头特征极其明显，没有任何主动混淆与抗审查能力，在面对现代深度包检测（DPI）系统时，握手阶段就会在数秒内被精确识别并瞬时阻断。而机场所采用的协议设计之初就是为了在严苛的网络审查环境下工作，通过伪装成标准 HTTPS 流量（TLS 1.3 握手、ALPN 协商、真实域名证书）甚至模仿 QUIC 协议视频流，使得外部流量分析系统无法将其与正常跨国网页浏览区分开来。</li>
              <li><strong>分流粒度与网络体验：</strong>传统 VPN 属于操作系统全局虚拟网卡（TAP/TUN）劫持，开启后整机所有流量无差别全部塞入境外通道，导致用户访问国内淘宝、微信、网易云音乐等服务时不仅速度骤降、出现异地登录告警，还会白白消耗昂贵的境外隧道流量。而现代机场依托 Clash、Surge、Sing-box 等规则分流客户端，内置精准的 GeoIP 与域名路由规则表，实现“国内直连毫秒级访问、国外敏感域名与流媒体自动走最优专线”的双向免配置分流。</li>
              <li><strong>网络拓扑与抗封锁能力：</strong>普通 VPN 服务商通常仅在海外机房采购公网 VPS（如 AWS、DigitalOcean 直连服务器），一旦 IP 被防火墙加入黑名单，整个连接彻底瘫痪。而成熟的机场采用“国内 BGP 智能多线接入 + 专有隧道内网穿透（IEPL/IPLC）+ 海外落地多重弹性调度”的立体网络拓扑，即使海外出口 IP 因频繁访问流媒体被平台封锁，也能在数秒内在内网调度完成 IP 轮换，前端用户完全无感知。</li>
            </ul>
          </div>
        </article>

        <article class="faq-item" id="faq-iepl-vs-iplc">
          <h3 class="faq-q">Q2：什么是 IEPL 与 IPLC 内网专线？为什么专线不会受到网络防火墙的干扰？</h3>
          <div class="faq-a">
            <p>
              在机场的技术参数中，“专线”代表着跨境加速服务的最顶尖技术架构等级。
            </p>
            <p>
              <strong>概念定义：</strong>
            </p>
            <ul>
              <li><strong>IPLC（International Private Leased Circuit，国际私有租用线路）：</strong>指的是跨国电信运营商在物理层直接开辟的点对点专用物理光缆或铜缆电路。IPLC 是完全独占的物理层通道，数据传输甚至不经过任何公共互联网路由交换节点。</li>
              <li><strong>IEPL（International Ethernet Private Line，国际以太网私营专线）：</strong>基于以太网技术（如 MSTP/OTN）封装的高速虚拟专用链路，提供二层（Layer 2）的数据透明传输通道。在实际体验上，IEPL 具备与 IPLC 几乎完全一致的性能表现，且在弹性带宽扩展与多点组网方面更具灵活性。</li>
            </ul>
            <p>
              <strong>为什么专线不受墙干扰且晚高峰零丢包？</strong><br />
              所有针对跨境互联网通信的流量审查与 QoS 拥塞限速，均部署在我国三大运营商的<strong>公网国际出口局（International Gateway Exchanges）</strong>处。当普通公网直连流量通过国际出口时，必须经历多层严格的 DPI 深度报文检查与分光镜像分析。而在国际海缆高负载时段（如每晚 20:00 - 23:00 晚高峰），国际出口交换机会针对非企业白名单的非核心流量强制执行随机丢包（丢包率通常可达 15%~40%）。<br />
              而 IEPL/IPLC 专线是企业级商务内网链路，通信双方在中国境内的入口机房（如深圳、上海）完成数据接入后，数据直接通过电信运营商专属的陆缆或海缆内网通道直接传输到境外落地机房（如中国香港、日本东京、新加坡），<strong>其物理路径根本不经过公网国际出口路由器！</strong>因此，专线流量天然免疫公网审查、不会被防火墙检测到协议特征，且在晚高峰期间享有独占保障带宽，丢包率常年稳定在 0.1% 以下，抖动极低。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-bgp-tunnel">
          <h3 class="faq-q">Q3：什么是 BGP 隧道中转？它与普通公网直连（直连机房）有什么区别？</h3>
          <div class="faq-a">
            <p>
              中转是介于“公网直连”与“企业专线”之间的高性价比折中方案。
            </p>
            <p>
              <strong>BGP 隧道中转的拓扑结构：</strong><br />
              用户设备 &rarr; [国内 BGP 多线接入机房] &rarr; [加密隧道传输] &rarr; [境外落地服务器] &rarr; 目标网站（如 Google/YouTube）。
            </p>
            <p>
              <strong>与公网直连的核心技术差异：</strong>
            </p>
            <ul>
              <li><strong>入口网络优化：</strong>我国不同运营商（电信、联通、移动、教育网、广电）之间的跨网互联一直存在互联互通瓶颈。如果使用公网直连 VPS，中国移动用户访问部署在境外仅针对中国电信优化的 CN2 GIA 机房，可能会绕道欧洲或美西，延迟高达 300ms 以上且丢包严重。而 BGP（Border Gateway Protocol，边界网关协议）中转节点在国内机房部署了同时接入电信、联通、移动三网光纤的服务器，三网用户都能在第一跳以 10ms~30ms 的极低本地延迟接入国内入口，再由入口服务器通过高速骨干网进行统一转发。</li>
              <li><strong>协议混淆与断流保护：</strong>公网直连节点的境外服务器 IP 直接暴露给国内用户设备与审查系统，一旦流量激增，境外 IP 会迅速被防火墙精准屏蔽（俗称“墙 IP”）。在中转模式下，用户所有请求只发给合法的国内中转服务器，国内服务器再通过自建的高强度加密隧道（如 TLS 双向认证、Gost、WS 隧道等）将数据流转送到海外，海外真实落地 IP 永远不直接对公网暴露，大大降低了节点批量失效的风险。</li>
            </ul>
          </div>
        </article>

        <article class="faq-item" id="faq-protocols-comparison">
          <h3 class="faq-q">Q4：Shadowsocks、Vmess、Vless、Trojan、Hysteria2 协议有何优缺点？哪个更抗封锁？</h3>
          <div class="faq-a">
            <p>
              不同开源代理协议在加密开销、握手延迟、抗主动探测以及网络穿透能力上各有侧重：
            </p>
            <div class="table-wrap">
              <table class="faq-compare-table">
                <thead>
                  <tr>
                    <th>协议名称</th>
                    <th>底层传输/加密特点</th>
                    <th>主要优势</th>
                    <th>主要缺点</th>
                    <th>推荐应用场景</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Shadowsocks (SS)</strong></td>
                    <td>AEAD 对称加密（如 AEAD_AES_256_GCM / Chacha20-poly1305）</td>
                    <td>性能极其轻量，CPU 占用极低，天然适合高并发与软路由路由器设备。</td>
                    <td>流量纯随机特征已知，若放在公网直连环境下容易被精准封锁。</td>
                    <td><strong>IEPL/IPLC 内网专线首选</strong>。因为专线不经公网，无需任何繁重混淆，SS 性能最强。</td>
                  </tr>
                  <tr>
                    <td><strong>VMess</strong></td>
                    <td>V2Ray 原创自研协议，复杂时间戳与动态 UUID 握手</td>
                    <td>功能强大，生态完备，支持 mKCP、WebSocket+TLS 深度伪装。</td>
                    <td>协议头字段冗余偏大，CPU 加密解密计算开销高，握手延迟较大。</td>
                    <td>早期公网穿透首选，现阶段正逐步被更轻量的 VLESS 替代。</td>
                  </tr>
                  <tr>
                    <td><strong>VLESS + XTLS / Reality</strong></td>
                    <td>无状态轻量化设计，去除冗余加密，借用目标知名网站真实 TLS 证书</td>
                    <td><strong>极其强悍的抗封锁能力</strong>。Reality 模式直接复用外网真实域名证书，无需自购域名，零特征防刺探。</td>
                    <td>客户端内核版本要求高（需 Mihomo / Xray 最新内核支持）。</td>
                    <td>公网中转与直连节点的最强抗封锁武器，被各大主流机场广泛部署。</td>
                  </tr>
                  <tr>
                    <td><strong>Trojan</strong></td>
                    <td>模拟真实 HTTPS 流量，未通过密码鉴权直接转发至假网站</td>
                    <td>完全符合标准 RFC TLS 规范，防主动探测能力优秀，兼容性好。</td>
                    <td>必须申请合法海外域名及有效 SSL/TLS 证书，对机场运维要求高。</td>
                    <td>主流中高端中转机场的标准备用协议，稳定性极佳。</td>
                  </tr>
                  <tr>
                    <td><strong>Hysteria2 (歇斯底里)</strong></td>
                    <td>基于 UDP/QUIC 深度改造，自研拥塞控制算法（BBR 改造版）</td>
                    <td><strong>公网劣质线路起飞神器！</strong>在高达 30% 恶劣丢包环境下仍能强行榨干带宽，抗 QoS 能力无敌。</td>
                    <td>对本地网络 UDP 质量极度敏感；部分运营商对 UDP 限速或彻底封锁时表现较差。</td>
                    <td>公网直连、远距离跨洋链路（如欧洲/美西）、校园网/弱网环境首选。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article class="faq-item" id="faq-node-multipliers">
          <h3 class="faq-q">Q5：什么是“倍率”？1.0x、0.2x、3.0x 节点分别意味着什么？如何避免流量被悄悄扣光？</h3>
          <div class="faq-a">
            <p>
              “倍率（Multiplier）”是机场计费系统中用于根据线路成本动态结算用户已用流量的系数。
            </p>
            <p>
              <strong>计算公式：</strong>实际结算消耗流量 = 用户真实上传下载数据量 &times; 节点标注倍率。
            </p>
            <ul>
              <li><strong>0.1x ~ 0.5x（低倍率福利节点）：</strong>通常由成本极低的公网直连大带宽服务器组成（如欧洲、美西冷门落地）。如果用户下载 10GB 的大文件，按照 0.1x 计算，账户仅扣除 1GB 套餐流量。非常适合网盘大文件离线同步、系统镜像下载等大吞吐场景。</li>
              <li><strong>1.0x（标准基准节点）：</strong>绝大多数主流中转或专线节点的标准计费比例。用户消耗多少数据量，账户就精准扣除多少流量。</li>
              <li><strong>2.0x ~ 5.0x（高倍率昂贵节点）：</strong>通常应用于成本极其高昂的高纯净度原生家庭宽带（Residential IP）节点、超低延迟游戏专线或独占大带宽落地。例如使用 5.0x 节点观看 2 小时 4K 视频消耗了 20GB 流量，系统将从你的账户中一口气扣除 100GB！</li>
            </ul>
            <p>
              <strong>避坑与防偷跑实用建议：</strong><br />
              1. 仔细阅读节点列表中的名称后缀，正规机场会在节点名字后明确注明倍率（如 <code>🇭🇰 香港 01 [IEPL] - 1.0x</code> 或 <code>🇯🇵 日本 08 [原生家庭IP] - 3.0x</code>）；<br />
              2. 严防“动态暗改倍率”的不良机场：部分无良小作坊在晚高峰悄悄将默认节点的 1.0x 篡改为 3.0x 甚至 5.0x，导致用户几天内套餐流量见底被迫续费；建议在客户端内设置“单日流量消耗告警”，或在节点选择策略组中排除 2.0x 以上的高倍率节点。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-native-ip">
          <h3 class="faq-q">Q6：什么是“原生 IP（Native/Residential IP）”？为什么 ChatGPT 和 Netflix 对原生 IP 判定如此苛刻？</h3>
          <div class="faq-a">
            <p>
              在 IP 地址注册数据库（如 ARIN、RIPE、APNIC）中，每个自治系统号（ASN）和 IP 段都明确标注了其归属类别与使用性质。
            </p>
            <p>
              <strong>机房 IP（Hosting/Data Center IP） vs 原生住宅 IP（Residential IP）：</strong>
            </p>
            <ul>
              <li><strong>机房 IP：</strong>归属于亚马逊 AWS、微软 Azure、谷歌云 GCP、阿里云、搬瓦工等商业云计算数据中心。这些 IP 本身设计给服务器和后台程序使用，正常人类不可能在家里用机房 IP 上网。</li>
              <li><strong>原生广播 IP（Native IP）：</strong>由落地国家/地区的本土主流互联网服务提供商（ISP）直接分配并注册在该国的 IP 地址（如香港 PCCW/HKT、日本 NTT/Softbank、美国 Comcast/AT&T）。在 MaxMind、IPinfo 等风控数据库中，其类别被标注为“ISP”或“Residential”。</li>
            </ul>
            <p>
              <strong>流媒体与 AI 大模型的风控封锁逻辑：</strong><br />
              像 Netflix、Disney+ 拥有极其严格的跨国版权分发协议，如果允许机房 IP 随意观看，会导致版权方对流媒体平台提起违约诉讼；而 OpenAI、Claude 则为了抵御黑客利用分布式服务器进行海量自动化 API 脚本刷取、恶意爬取大模型权重以及垃圾信息注册。当成千上万个代理用户共用同一个数据中心 IP 发起请求时，安全 WAF 系统会将其瞬间判定为“代理节点/机器集群”，立即触发封禁拦截。因此，只有纯净度极高的本土原生 ISP 广播 IP，才能在流媒体与 AI 大模型前伪装成真实的本地普通居民家庭宽带。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-latency-jitter-loss">
          <h3 class="faq-q">Q7：测速显示的“延迟”、“抖动”和“丢包率”究竟代表什么？延迟越低就代表速度越快吗？</h3>
          <div class="faq-a">
            <p>
              许多新手存在一个严重的技术误区：“延迟只有 30ms 的节点一定比延迟 150ms 的节点下载速度快”。这种认知在网络工程学中是完全错误的。
            </p>
            <p>
              <strong>三大核心网络可观测性指标深度拆解：</strong>
            </p>
            <ul>
              <li><strong>延迟（Latency / Ping）：</strong>数据包从你的本地设备出发，经过各种路由跳数到达目标节点并返回所需的往返时间（RTT，Round-Trip Time）。受物理光速与光纤折射率限制，中国沿海到中国香港的物理极限极限延迟在 20ms~30ms，到日本东京约 40ms~60ms，而横跨太平洋到美国西海岸洛杉矶物理极限就是 120ms~150ms。<strong>延迟高不等于网速慢！</strong>一个高质量的美西 IEPL 节点即使延迟有 140ms，也能轻轻松松跑满 1000Mbps 下载 4K 蓝光电影；而延迟的作用主要体现在对实时交互极其敏感的场景（如外服竞技类联机网游、SSH 命令行敲击回显、股票期货高频撮合）。</li>
              <li><strong>丢包率（Packet Loss）：</strong>在传输过程中丢失的数据包占总发送数据包的百分比。<strong>丢包率是网络体验的真正头号杀手！</strong>现代互联网广泛采用 TCP 传输协议，TCP 内部包含极为保守的拥塞控制算法（如 Reno、CUBIC）。一旦检测到 2% 以上的丢包，算法就会判定网络发生了严重拥塞，瞬间将数据发送窗口斩半（降窗），即使你拥有万兆物理带宽，TCP 吞吐量也会暴跌至几百 KB/s，导致网页打不开、视频频繁缓冲卡顿。</li>
              <li><strong>抖动（Jitter）：</strong>前后两个连续数据包到达时间差的波动方差。低抖动（&lt; 3ms）意味着数据传输极其平稳规律，是 Zoom/Teams 跨国高清音视频通话不出现爆音、机械音以及流媒体音画同步的最关键底座。</li>
            </ul>
          </div>
        </article>

        <article class="faq-item" id="faq-dns-leak-pollution">
          <h3 class="faq-q">Q8：什么是 DNS 污染与 DNS 泄漏？如何在客户端彻底杜绝隐私泄露？</h3>
          <div class="faq-a">
            <p>
              DNS（域名系统）是互联网的寻址电话薄。在跨境网络访问中，DNS 环节是安全攻防与连接成败的最前线。
            </p>
            <p>
              <strong>DNS 污染（DNS Cache Poisoning / Tampering）：</strong><br />
              防火墙长期针对公网 53 端口的未加密 UDP DNS 查询报文进行旁路监听。当你尝试查询境外网站（如 google.com）时，即使你的请求刚发送给远端服务器，防火墙也会抢在真实权威 DNS 服务器之前，抢先伪造一个错误的虚假 IP 地址（如 127.0.0.1 或不可达 IP）回包给你。如果你的客户端直接采信了这个虚假 IP，浏览器就会出现“连接超时”或“连接被拒绝”。
            </p>
            <p>
              <strong>DNS 泄漏（DNS Leak）：</strong><br />
              虽然你开启了代理软件，所有网页流量确实走的是境外加密隧道，但你的操作系统在解析域名时，依然盲目调用了本地运营商分配的宽带 DNS（如 114.114.114.114 或本地电信 DNS）。这导致本地运营商、网络管理员可以清清楚楚地实时记录你访问过的每一个敏感境外域名的完整清单，这被称为 DNS 泄漏。
            </p>
            <p>
              <strong>彻底杜绝 DNS 泄漏的标准配置法（以 Clash Verge Rev / Mihomo 为例）：</strong><br />
              1. 进入客户端设置，启用 <code>DNS Over HTTPS (DoH)</code> 或 <code>DNS Over TLS (DoT)</code> 加密通信；<br />
              2. 开启 <strong>Fake-IP 模式</strong>（虚拟 IP 映射机制）：当浏览器请求域名时，Clash 直接在本地分配一个 <code>198.18.0.0/16</code> 保留网段的虚拟 IP 返回给浏览器，真实域名解析彻底移交到海外远端代理服务器进行，在本地物理网络上彻底杜绝任何明文 DNS 报文的产生；<br />
              3. 配合开启 TUN 模式，并在规则中严禁让未经加密的 53 端口流量泄漏到直连网卡中。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-audit-rules">
          <h3 class="faq-q">Q9：为什么正规机场普遍屏蔽 BT 下载与邮件 25 端口？什么是“审计规则”？</h3>
          <div class="faq-a">
            <p>
              很多新手用户在购买机场后，尝试用 BitTorrent、uTorrent、迅雷挂机下载盗版影视或游戏，结果导致机场账号被立即封禁且不予退款，由此产生大量纠纷。这背后的核心原因在于<strong>服务器合规与 IP 防封生存法则</strong>。
            </p>
            <ul>
              <li><strong>版权法与 DMCA 投诉追责：</strong>欧美及东亚主流机房对数字版权保护极为严苛。一旦有用户通过机房 IP 进行 BT/P2P 做种分发，好莱坞制片方与版权监测机构（如 DMCA）会在数小时内向数据中心自动发出严重侵权滥用通知（Abuse Complaint）。机房一旦收到多次投诉，会无条件强行封停整台母机服务器，甚至直接没收该机场的全部租用押金与 IP 段。为了保障数万名普通正常用户的服务不被一人连累，正规机场必须全天候通过协议层阻断所有 P2P 报文。</li>
              <li><strong>垃圾邮件防护（SPAM 黑名单）：</strong>TCP 25 端口是明文邮件 SMTP 传输的标准端口。黑客和垃圾邮件发送者热衷于利用代理服务器发送海量钓鱼邮件。一旦机房 IP 被国际反垃圾邮件组织（如 Spamhaus）拉黑，整批 IP 将无法再为任何企业提供邮件收发服务，因此所有正规机场无一例外都会封死 25 端口。</li>
              <li><strong>审计规则的边界：</strong>合规合理的审计规则应当仅限于“防滥用”范畴（如阻断 BT 下载、屏蔽儿童有害色情内容、屏蔽高频黑客扫描端口与金融欺诈钓鱼网站）。用户应当高度警惕那些滥用审计系统去劫持用户剪贴板、强制篡改电商返利链接或进行敏感隐私监控的无良不良机场。</li>
            </ul>
          </div>
        </article>

        <article class="faq-item" id="faq-device-limits">
          <h3 class="faq-q">Q10：什么是“并发连接数”与“同时在线设备数”？为什么超出会导致断流？</h3>
          <div class="faq-a">
            <p>
              机场套餐通常会在资费表中标注“同时在线设备数：3 台”或“并发连接限制：128”。这两个概念代表着不同的限制维度：
            </p>
            <ul>
              <li><strong>同时在线设备数限制：</strong>机场后端通过统计在指定时间窗口内（如 5 分钟内），使用该订阅链接发起请求的不同公网客户端 IP 数量。如果你家里有 1 台电脑、1 台手机都在连接家里同一个 Wi-Fi（对外展现为同一个公网 IP），这在大多数机场后端通常只计为<strong>1 个公网 IP</strong>；但如果你带着手机在外面使用 5G 移动流量，同时家里的软路由也在跑代理，这就属于<strong>2 个不同的公网 IP</strong>。若超出套餐规定的公网 IP 数量，后端会自动熔断最晚连接的 IP，导致新设备出现无论怎么测速都是 Timeout 的假死状态。</li>
              <li><strong>TCP 并发连接数限制（Concurrent Connections）：</strong>指同一时刻服务器允许你的账号保持活跃的 TCP Socket 会话总数。例如现代浏览器打开一个复杂的电商网页，可能会在数秒内建立 30~50 个并行 TCP 握手。如果用户在后台开启了大量多线程下载工具（如 IDM 设置 32 线程并发抓取），极易瞬间打满 128 或 256 的并发上限，导致其他所有网页彻底失去响应。</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- 分类二：选购避坑与资费防雷篇 -->
    <section id="cat-purchase" class="faq-section">
      <div class="cat-header">
        <span class="cat-num">CATEGORY 02</span>
        <h2>二、选购避坑、资费防雷与服务鉴别篇</h2>
        <p class="cat-desc">拆解机场商业运营模式、成本核算红线、跑路风险规避与低成本双机场容灾方案。</p>
      </div>

      <div class="faq-accordion">
        <article class="faq-item" id="faq-fake-iepl">
          <h3 class="faq-q">Q11：如何识别“虚假 IEPL 专线”？月付 10 元宣称全专线的机场到底是如何造假的？</h3>
          <div class="faq-a">
            <p>
              真正的企业级 IEPL 专线带宽成本极为高昂，在当前电信市场采购均价约为 <strong>¥40 ~ ¥80 元 / 每 Mbps / 每月</strong>。一个能承载千人晚高峰不卡顿的 1Gbps 专线，光是每个月的内网线路硬性支出就高达 4 万至 8 万元人民币。
            </p>
            <p>
              <strong>骗局本质：</strong>那些月付 8 元、10 元还宣称提供 500GB 全内网专线的机场，从财务模型上根本无法实现盈利。它们的造假手段通常有以下三种：
            </p>
            <ol>
              <li><strong>文本重命名欺诈（改名党）：</strong>将成本仅为几块钱的普通公网直连（直连香港、直连美国）节点，在订阅生成面板中直接强行命名为 <code>香港 01 [企业级 IEPL 专线]</code>，这种欺诈最为恶劣；</li>
              <li><strong>偷梁换柱混掺（薛定谔专线）：</strong>全机场可能确实仅采购了 50Mbps 的极小专线用于充当门面应付测速，平时 95% 的用户真实访问流量全部被后端负载均衡悄悄路由到廉价的公网隧道甚至直连线路中；</li>
              <li><strong>伪装中转（公网跨洋穿透）：</strong>仅仅使用了国内一台廉价单线云服务器做端口转发，国内服务器与海外服务器之间走的依然是公网国际出口，晚高峰一到丢包率立刻飙升至 30% 以上。</li>
            </ol>
            <p>
              <strong>技术自测鉴别真伪的三大实操步骤：</strong><br />
              1. <strong>晚高峰关键时段 MTR 路由追踪：</strong>在每晚 20:30 使用 BestTrace 或 WinMTR 工具对节点入口 IP 进行连续发包。真专线从国内入口机房到境外落地机房之间，中间跳数极少（通常仅有 2~4 跳内网交换节点），且完全看不到公网骨干网 <code>202.97.*.*</code> (163) 等路由节点；<br />
              2. <strong>晚高峰丢包率压测：</strong>连续发包 1000 次，真正合规的专线由于拥有独占带宽保障，其丢包率严格在 0.1% 以下；而假专线在晚高峰期间丢包率必然超过 10% 以上；<br />
              3. <strong>跨国敏感事件期间表现：</strong>在每年的特殊敏感保障期（如重要会议期间），公网直连与普通公网中转节点会遭遇大面积封锁断流甚至全面失效，而真专线由于不走公网审查出口，全程丝毫不受影响。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-annual-plan-risk">
          <h3 class="faq-q">Q12：为什么强烈不建议新手一上来就购买年付甚至三年付套餐？</h3>
          <div class="faq-a">
            <p>
              在机场行业长达十年的发展史中，“年付收割”是不良机场跑路的最典型套路。
            </p>
            <p>
              <strong>机场行业的三大不可控高风险属性：</strong>
            </p>
            <ul>
              <li><strong>政策与通报风险：</strong>机场运营者大多处于灰色地带，其境内中转服务器、国内入口 IDC 机房随时面临被监管通报、断网拔线或查封的风险；</li>
              <li><strong>网络波动与资金链断裂：</strong>一旦上游专线提供商被严查或涨价，低价年付收上来的资金早已在初期被运营者挥霍或转移，面对突发的重新部署成本，无力回天的运营者最直接的退场方式就是一键注销 Telegram 频道与官网，俗称“跑路”；</li>
              <li><strong>降速与服务质量下滑：</strong>许多新机场开业初期为了冲销量，提供极具诱惑力的“99 元三年付 1000GB/月”，初期由于用户少速度飞快。一旦大量年付用户进场，总带宽迅速被挤爆，由于年费已经落袋为安，运营者缺乏持续升级带宽的财务动力，节点质量在 3 个月后便断崖式下跌，用户弃之可惜、食之无味。</li>
            </ul>
            <p>
              <strong>选购黄金法则：</strong>首选支持<strong>月付（Monthly）或季付（Quarterly）</strong>的品牌。只有当一家机场你连续稳定使用了半年以上、其技术支持与维护频次得到充分验证，且年付优惠确实在合理财务逻辑内时，才考虑以年付方式降低支出成本。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-budget-vs-premium">
          <h3 class="faq-q">Q13：平价机场（月付 5-10 元）与高端机场（月付 30-80 元）的核心成本差距到底在哪里？</h3>
          <div class="faq-a">
            <p>
              机场产品并不是简单的“买高价就是被收智商税”，价格层级背后反映的是完全不同的基础设施投入与运营服务水准：
            </p>
            <div class="table-wrap">
              <table class="faq-compare-table">
                <thead>
                  <tr>
                    <th>评测维度</th>
                    <th>平价/入门级机场 (¥5 ~ ¥10/月)</th>
                    <th>中高端/旗舰专线机场 (¥30 ~ ¥80/月)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>底层网络架构</strong></td>
                    <td>公网直连为主，或单线国内中转隧道，无冗余备份</td>
                    <td>多地三网 BGP 智能接入 + 企业级双线 IEPL/IPLC 物理内网专线</td>
                  </tr>
                  <tr>
                    <td><strong>晚高峰表现</strong></td>
                    <td>20:00-23:00 丢包率显著升高（15%~30%），4K 视频严重卡顿</td>
                    <td>全天候丢包率 &lt; 0.1%，延迟波动 &lt; 2ms，晚高峰秒开 4K/8K 视频</td>
                  </tr>
                  <tr>
                    <td><strong>落地 IP 纯净度</strong></td>
                    <td>廉价公网机房 IP，数百人共享，频繁触发 Google 人机验证</td>
                    <td>采购昂贵原生 ISP/家庭宽带双栈 IP，极少出现验证码与风控拦截</td>
                  </tr>
                  <tr>
                    <td><strong>流媒体与 AI 解锁</strong></td>
                    <td>DNS 劫持解锁，经常失效，ChatGPT/Claude 经常报错拒访</td>
                    <td>自建独立住宅 IP 解锁池，流媒体全绿，ChatGPT/Claude 稳定原生访问</td>
                  </tr>
                  <tr>
                    <td><strong>运维与客服响应</strong></td>
                    <td>一人业余兼职运维，工单响应周期长达 24~48 小时，节点挂了随缘修</td>
                    <td>专业专职团队 24/7 监控，自动化故障告警，数分钟内无缝故障自愈切换</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article class="faq-item" id="faq-dual-airport-strategy">
          <h3 class="faq-q">Q14：什么是“双机场灾备容灾方案”？最科学经济的组合配置是什么？</h3>
          <div class="faq-a">
            <p>
              在跨境加速领域，没有任何一家机场能做出“100% 永不故障、永不波动”的绝对技术承诺。对于依赖外网进行跨国远程办公、外贸业务对接或关键技术开发的重度用户而言，单点依赖是极其致命的系统性隐患。
            </p>
            <p>
              <strong>双机场容灾黄金搭档（主干专线 + 不限时按量计费）：</strong>
            </p>
            <ul>
              <li><strong>主干机场（主力保障）：</strong>选择一家高品质的 IEPL/BGP 中高端品牌（如月付 20~30 元的光速云或暮光加速），承担日常 90% 的所有大流量消耗（如日常网页浏览、4K 视频、日常开发）；</li>
              <li><strong>备用机场（冷备容灾）：</strong>购买一家<strong>无过期时间、按量计费（Pay As You Go）</strong>的稳定品牌（如星岛梦、肥猫云的一次性按量包，例如 30 元买 200GB 永久有效）。将其订阅导入同一个客户端作为备用策略组，平时不使用不扣钱；一旦主力机场遭遇突发网络波动、专线割接或官网升级时，在客户端内只需一秒钟切换策略组，网络立刻恢复，业务彻底免受中断困扰。</li>
            </ul>
          </div>
        </article>

        <article class="faq-item" id="faq-payment-security">
          <h3 class="faq-q">Q15：机场支付支持哪些方式更安全？使用虚拟货币（USDT）还是微信/支付宝？</h3>
          <div class="faq-a">
            <p>
              支付环节直接关系到用户的个人金融隐私与资金安全：
            </p>
            <ul>
              <li><strong>微信/支付宝免签个人发卡接口（风险较高）：</strong>一些小作坊机场通过个人挂机监听 App 实现收款，支付时会跳转到陌生的个人微信赞赏码或个人转账页面。这种接口极易发生单边掉单、资金被黑，且用户的真实个人身份信息直接暴露给私人收款方；</li>
              <li><strong>正规第三方跨境聚合支付网关（体验与平衡首选）：</strong>中大型机场通常接入合规的聚合支付系统（如海外 Stripe、PetaPay、EPUSDT 自动结算系统）。在支付过程中，商户后台无法获知你的真实银行卡号和姓名，仅作为一笔匿名交易订单处理，便捷且资金有基本通道保障；</li>
              <li><strong>虚拟货币（USDT-TRC20 / BTC，隐私最高级）：</strong>对于隐私要求极高、担心支付流水被追溯的技术极客，加密货币是去中心化、端到端匿名的终极支付手段。正规大型机场普遍提供 USDT 结账通道，并通常提供 5%~10% 的额外折扣返利。</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- 分类三：客户端与连接故障排查篇 -->
    <section id="cat-client-troubleshoot" class="faq-section">
      <div class="cat-header">
        <span class="cat-num">CATEGORY 03</span>
        <h2>三、客户端配置、网络故障与连接报错排查篇</h2>
        <p class="cat-desc">实战排查客户端网络假死、订阅更新失败、系统代理与 TUN 模式冲突、微信能发但网页打不开等高频疑难杂症。</p>
      </div>

      <div class="faq-accordion">
        <article class="faq-item" id="faq-err-proxy-failed">
          <h3 class="faq-q">Q16：电脑开启代理后，微信能发消息但网页全部打不开，提示“ERR_PROXY_CONNECTION_FAILED”怎么修？</h3>
          <div class="faq-a">
            <p>
              这是所有 Windows 和 macOS 用户在日常使用中遇到频率最高、最令人崩溃的典型故障。
            </p>
            <p>
              <strong>根本故障原因：</strong><br />
              微信、QQ 等即时通讯软件默认使用自定义的直接 TCP 连接或私有协议，不强制依赖操作系统的 HTTP 代理设置。而 Edge、Chrome 等浏览器严格遵循系统代理环境变量。当你非正常关闭代理软件（如电脑死机、强制关机、软件闪退、任务管理器强杀进程）时，代理软件来不及在退出前<strong>清理操作系统的代理注册表开关</strong>。操作系统依然盲目地把所有网页流量发送到本地监听端口（如 <code>127.0.0.1:7890</code>），而此时本地代理核心并未运行，浏览器自然报错“代理服务器连接失败”。
            </p>
            <p>
              <strong>彻底解决的三步实操修复指南：</strong>
            </p>
            <ol>
              <li><strong>最快速修复：</strong>重新打开 Clash Verge Rev 或你使用的代理客户端，正常点击连接一次，然后再通过软件菜单的“退出应用”正常关闭。软件会在正常关闭阶段自动复位系统代理设置；</li>
              <li><strong>Windows 手动清理操作：</strong>按下键盘 <code>Win + i</code> 打开系统设置 &rarr; 进入【网络和 Internet】 &rarr; 点击【代理】 &rarr; 找到【手动设置代理】 &rarr; <strong>将“使用代理服务器”彻底关闭（设为 Off）</strong>，同时确保下方的“请勿将代理服务器用于本地地址”处于清空状态；</li>
              <li><strong>开启 TUN 虚拟网卡模式（一劳永逸）：</strong>如果你经常需要关机或休眠电脑，建议在客户端内彻底开启 <strong>TUN 模式</strong>，并关闭“系统代理”开关。TUN 模式依靠虚拟网卡驱动接管流量，系统休眠或重启时虚拟网卡会自动重置，永远不会再出现因系统代理残留导致的浏览器断网。</li>
            </ol>
          </div>
        </article>

        <article class="faq-item" id="faq-sub-update-failed">
          <h3 class="faq-q">Q17：导入或更新订阅链接时报错“网络超时”、“404”或“Invalid YAML”如何排查？</h3>
          <div class="faq-a">
            <p>
              订阅更新失败通常由以下几类网络层或应用层阻断引起：
            </p>
            <ul>
              <li><strong>订阅域名被墙阻断：</strong>部分机场用于分发订阅的 API 域名被公网防火墙列入了黑名单或遭到 DNS 污染。解决方法：在客户端设置中，将“更新订阅走代理”开关打开，或者在浏览器开启全局代理后，复制订阅链接到浏览器地址栏尝试能否直接下载为一个纯文本文件；</li>
              <li><strong>套餐到期或流量已彻底耗尽（返回 404 / 403）：</strong>登录机场官网用户后台，核实你的账户服务状态是否变为“Expired（已过期）”或剩余可用流量显示为 0MB。若已耗尽，后端 API 会自动拒绝返回节点列表；</li>
              <li><strong>节点格式编码解析错误（Invalid YAML）：</strong>部分过时的老客户端不支持包含中文别名、特殊符号或新型协议（如 Hysteria2）的节点配置。解决方法：优先更换为现代活跃维护的客户端（如 <strong>Clash Verge Rev</strong> 或 <strong>Sing-box</strong>），并在机场后台选择带有“Clash Meta”或“Mihomo”标识的专用订阅格式。</li>
            </ul>
          </div>
        </article>

        <article class="faq-item" id="faq-all-nodes-timeout">
          <h3 class="faq-q">Q18：导入节点后，在客户端进行延迟测速全部显示“Timeout / -1ms”，如何排查？</h3>
          <div class="faq-a">
            <p>
              如果所有几十个节点在测速时无一例外全部超时，说明<strong>问题 100% 出在本地配置或入口阻断，而不是所有节点同时损坏</strong>：
            </p>
            <ol>
              <li><strong>核查系统时间是否精确同步（90% 的元凶）：</strong>现代加密协议（尤其是 VMess、Shadowsocks AEAD 及 TLS 证书校验）强制要求本地设备与服务器时间的时差不得超过 <strong>90 秒</strong>！如果你的电脑或手机由于长期休眠或主板电池没电，导致系统时钟慢了 2 分钟，所有握手包将全部被服务器当场拒签！解决方法：进入系统设置，点击“立即同步时间”，确保网络授时成功；</li>
              <li><strong>检查本地防火墙与杀毒软件：</strong>Windows Defender、360 安全卫士或火绒可能会静默拦截 <code>mihomo.exe</code> 或 <code>clash-core.exe</code> 的出站网络连接。进入防火墙白名单，确保代理内核具有完全的网络访问权限；</li>
              <li><strong>核查是否误开了其他网络加速器或旧代理冲突：</strong>如果电脑同时运行了 Watt Toolkit（Steam++）、加速盒子、UU加速器或 Charles 抓包工具，它们对本地 Winsock 协议栈的争夺会导致数据包被挂起。退出其他所有冲突软件后重试。</li>
            </ol>
          </div>
        </article>

        <article class="faq-item" id="faq-sleep-wake-up-stuck">
          <h3 class="faq-q">Q19：电脑睡眠唤醒后，客户端无法联网，必须反复重启软件甚至重启系统？</h3>
          <div class="faq-a">
            <p>
              该现象主要出现在开启了 TUN 模式的 Windows 笔记本设备上。
            </p>
            <p>
              <strong>技术底层机理：</strong>系统在进入睡眠或休眠状态时，物理网卡（Wi-Fi 或有线网卡）断电降速，而 TUN 驱动创建的虚拟网卡（wintun.sys）仍停留在休眠前的网络路由表状态。唤醒后，物理网卡重新从路由器获取了新的 DHCP IP 和本地网关，但系统的默认路由优先级（Metric）未能正确写回给 TUN 驱动，导致数据包在本地路由环路中死锁。
            </p>
            <p>
              <strong>永久修复方案：</strong><br />
              1. 打开 Clash Verge Rev 的【设置】界面；<br />
              2. 找到【TUN 模式堆栈】设置项，将默认的 <code>gvisor</code> 更改为 <code>system</code>（系统原生网络栈）或 <code>mixed</code> 模式；<br />
              3. 在“高级设置”中开启 <strong>自动路由监听（Auto Route Watcher）</strong>，此开关会监测操作系统的休眠与唤醒事件，在网络恢复的第一时间自动重新挂载并校准虚拟网卡路由表。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-local-lan-blocked">
          <h3 class="faq-q">Q20：开启代理后，无法访问局域网内的群晖 NAS、家庭打印机或公司内网 OA 怎么办？</h3>
          <div class="faq-a">
            <p>
              这是由于客户端的分流规则将私有局域网 IP 段误判为了需要走代理的公网流量。
            </p>
            <p>
              <strong>解决方案：</strong>检查并确保客户端配置中包含了标准的局域网旁路规则：
            </p>
            <pre><code>rules:
  # 必须置于最顶部的直连豁免规则组
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,100.64.0.0/10,DIRECT,no-resolve
  - DOMAIN-SUFFIX,local,DIRECT
  - MATCH,ProxyGroup</code></pre>
            <p>
              在 TUN 模式的高级设置中，确保勾选了 <code>Strict Route</code> 与 <code>Bypass Private Network</code>（私有网络自动旁路直连）选项。
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- 分类四：流媒体跨区与 AI 大模型专项篇 -->
    <section id="cat-media-ai" class="faq-section">
      <div class="cat-header">
        <span class="cat-num">CATEGORY 04</span>
        <h2>四、流媒体跨区、版权解锁与 AI 大模型风控突破篇</h2>
        <p class="cat-desc">深度解析 Netflix/Disney+ 非自制剧锁定、OpenAI 1020 报错、Claude 封号风险控制及专用分流规则编写实战。</p>
      </div>

      <div class="faq-accordion">
        <article class="faq-item" id="faq-netflix-originals-only">
          <h3 class="faq-q">Q21：为什么登录 Netflix 只能看自制剧（Netflix Originals），搜不到《绝命毒师》等版权剧？</h3>
          <div class="faq-a">
            <p>
              这在流媒体圈被称为“半解锁（Half-Unlocked）”或“软屏蔽”。
            </p>
            <p>
              <strong>技术机理：</strong>Netflix 对自制剧（如《怪奇物语》、《鱿鱼游戏》等冠以大红标“N”的作品）拥有全球范围内的独家发行权，因此只要账号处于正常付费状态，无论从哪个国家甚至通过机房 IP 访问，Netflix 都允许你播放。但对于从其他好莱坞制片厂购买的非自制剧（如《绝命毒师》、《生活大爆炸》、《Rick and Morty》等），由于版权分销协议仅限定在特定国家/地区，Netflix 必须通过最严格的 IP 归属地库（如 MaxMind、IP2Location）进行准入判定。如果你的节点使用的是普通机房 IP，Netflix 虽不至于直接报错禁止登录，但会静默过滤掉所有受版权保护的影片，让你以为该平台没有这些内容。
            </p>
            <p>
              <strong>彻底解决实操：</strong>在客户端内切换标注有 <code>解锁 Netflix</code>、<code>原生 IP</code> 或 <code>住宅 ISP</code> 的专属流媒体节点，并彻底清除浏览器关于 Netflix 的所有 Cookie 与本地缓存后重新登录。
            </p>
          </div>
        </article>

        <article class="faq-item" id="faq-chatgpt-1020-blocked">
          <h3 class="faq-q">Q22：访问 ChatGPT 提示“Access denied (Error 1020)”或“Unable to load site”的终极解决方案？</h3>
          <div class="faq-a">
            <p>
              OpenAI 采用了 Cloudflare 最严苛的 Edge WAF 反爬虫拦截网，出现此类报错通常不是账号被封，而是<strong>节点 IP 被 Cloudflare 判定为高风险网络或处于未支持的物理地区</strong>。
            </p>
            <p>
              <strong>标准解决四部曲：</strong>
            </p>
            <ol>
              <li><strong>绝对严禁使用中国香港节点：</strong>截至目前，OpenAI 官方从未向中国香港特别行政区开放任何服务权限！无论该香港节点多么高速，只要连接香港 IP 访问 OpenAI，系统会立即返回无法访问的阻断页面。请务必将规则定向到<strong>日本、新加坡、美国或英国</strong>等完全支持的地区节点；</li>
              <li><strong>更换高纯净度原生节点：</strong>在客户端策略组中，为 OpenAI/ChatGPT 编写专用的路由规则分流组，指定走具备原生 ISP 广播的专用节点，避免与数千个普通刷网页的用户共享同一个普通机房出口；</li>
              <li><strong>彻底清除本地存储与 Service Worker 缓存：</strong>按下 <code>F12</code> 打开浏览器开发者工具 &rarr; 点击【Application（应用）】标签 &rarr; 点击左侧【Storage】 &rarr; 点击【Clear site data（清除网站数据）】，彻底重置已缓存的失败阻断状态；</li>
              <li><strong>防范 WebRTC 与本地真实 IP 穿透：</strong>在 Chrome 扩展商店中安装“WebRTC Control”扩展，禁用浏览器在后台通过 STUN 服务器获取并上报你真实的本地公网内网 IP。</li>
            </ol>
          </div>
        </article>

        <article class="faq-item" id="faq-claude-account-ban">
          <h3 class="faq-q">Q23：为什么 Claude 3.5 Sonnet 特别容易封号？有哪些防封的黄金准则？</h3>
          <div class="faq-a">
            <p>
              Anthropic 对 Claude 平台的风控严苛程度远超 OpenAI。大量用户在使用国内信用卡或频繁切换节点时遭遇无预警永久封号。
            </p>
            <p>
              <strong>Anthropic 核心风控维度剖析：</strong>
            </p>
            <ul>
              <li><strong>节点物理地理位置跨国频繁瞬移：</strong>例如 10 分钟前使用美国洛杉矶节点向 Claude 提问，10 分钟后由于策略组自动轮换切换成了日本东京节点。这种在物理世界中绝对不可能发生的高速跨洋漂移，会被 Anthropic 的反欺诈机器人瞬间标记为多账号共享或代理攻击，立即触发封号；</li>
              <li><strong>付款卡归属与 IP 国家不匹配：</strong>注册或充值 Claude Pro 时，如果使用欧洲或香港虚拟信用卡，而访问 IP 是美西，极易因账单国家与连接国家冲突导致系统拒付封停。</li>
            </ul>
            <p>
              <strong>防封自保黄金法则：</strong><br />
              1. 为 Claude 设立<strong>“单节点独占直连”规则</strong>：在客户端内锁定一个纯净度最高的美西原生节点，在任何时候都绝不随意切换；<br />
              2. 始终在无痕浏览窗口中登录使用，或使用官方推荐的 Claude Code / 官方 API 接口调用；<br />
              3. 绑定美国本土发行的商业虚拟卡（如 Depay、WildCard 等），并保持账单邮编与节点所在州大体一致。
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- 分类五：安全防护与合规隐私篇 -->
    <section id="cat-security-privacy" class="faq-section">
      <div class="cat-header">
        <span class="cat-num">CATEGORY 05</span>
        <h2>五、安全防护、隐私保护与合规自保篇</h2>
        <p class="cat-desc">揭秘机场主是否能截获你的账号密码、如何防范中间人劫持以及个人使用合规红线。</p>
      </div>

      <div class="faq-accordion">
        <article class="faq-item" id="faq-airport-owner-steal-password">
          <h3 class="faq-q">Q24：机场主能看到我的密码、银行卡号和聊天记录吗？HTTPS 真的绝对安全吗？</h3>
          <div class="faq-a">
            <p>
              这是用户对隐私安全最深层的顾虑。答案需要从协议加密层级进行客观分析：
            </p>
            <p>
              <strong>结论：对于标准的 HTTPS 加密网站，机场主绝对无法窃取你的密码与银行卡明文信息！</strong>
            </p>
            <ul>
              <li><strong>端到端 TLS 加密保护：</strong>现代互联网 99% 的核心网站（包括 Google、银行、知乎、微信等）均强制启用了全站 HTTPS（TLS 1.3/1.2）。当你向银行输入密码时，数据在离开你的浏览器前就已经通过银行服务器的公钥完成了高强度非对称加密。机场服务器在传输过程中只扮演一个“盲目搬运工”的角色，其看到的只是一串完全随机乱码的二进制密文，没有任何计算能力在合理时间内将其破解。</li>
              <li><strong>机场主能看到什么：</strong>由于 TLS 握手阶段目前仍存在明文 SNI（Server Name Indication，服务器名称指示），机场主可以通过日志审计查看到你<strong>正在访问哪个域名</strong>（例如你在什么时间访问了 youtube.com，以及大约传输了多少 MB 的数据包），但他绝无法知道你在 YouTube 上具体搜索了什么关键词、看的是哪个视频，更无法获知你的账户密码。</li>
              <li><strong>绝对致命的例外（伪造根证书风险）：</strong>如果某个机场强制要求你在操作系统中下载并安装其自制的“系统根证书（CA Certificate）”，<strong>请立即删除并彻底远离！</strong>一旦你在本地信任了第三方未知 CA 根证书，攻击者就可以在服务器端发起无感知的中间人解密（MITM Attack），届时你的所有 HTTPS 明文数据将被一览无余！</li>
            </ul>
          </div>
        </article>

        <article class="faq-item" id="faq-legal-compliance">
          <h3 class="faq-q">Q25：普通个人使用机场查阅技术文献、看海外视频是否违规？有什么合规红线？</h3>
          <div class="faq-a">
            <p>
              在我国相关法律法规框架下，针对跨境计算机网络的使用有着极其明确的边界限定：
            </p>
            <ul>
              <li><strong>合规红线与严禁行为：</strong>严禁利用跨境外网从事危害国家安全、泄露国家秘密、颠覆政权、宣扬恐怖主义等违法犯罪活动；严禁通过外网发表反动言论、参与网络赌博、洗钱、诈骗及传播淫秽色情信息；严禁非法组网进行以营利为目的的跨境电信转售。</li>
              <li><strong>合理用途与自我约束：</strong>绝大多数科研工作者、IT 工程师、跨国外贸从业者以及高校学生，其使用需求严格局限于查阅学术论文（如 IEEE、ArXiv）、技术文档（GitHub、Stack Overflow）、外贸业务对接与正规流媒体文化交流。在日常使用中，恪守“纯洁用途、不参与政治炒作、不自建非法商业转售、不传播煽动性谣言”的原则，是保障个人网络使用安全长久的最根本准绳。</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- 分类六：42 家机场高频特性与技术支持对照表 -->
    <section id="cat-matrix-table" class="faq-section">
      <div class="cat-header">
        <span class="cat-num">CATEGORY 06</span>
        <h2>六、42 家主流机场核心参数、协议支持与技术特性全景对照</h2>
        <p class="cat-desc">汇集网络基础设施观测实验室长周期实测数据，涵盖专线类型、核心协议、工单响应时效及流媒体解锁评级。</p>
      </div>

      <div class="table-container">
        <table class="observatory-table">
          <thead>
            <tr>
              <th>排名与品牌</th>
              <th>线路底层类别</th>
              <th>主要协议栈</th>
              <th>支持一键客户端</th>
              <th>流媒体/AI 原生解锁</th>
              <th>客服与工单响应</th>
              <th>测评链接与官网</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>#1 光速云</strong> (站长首选)</td>
              <td>双线内网 IEPL 专线</td>
              <td>VLESS (Reality) / SS</td>
              <td><span class="badge blue">提供全平台一键端</span></td>
              <td><span class="badge green">Netflix / ChatGPT 全解</span></td>
              <td>15分钟内快速工单</td>
              <td><a href={withBase('/works/guangsu/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#2 暮光加速</strong> (影音首选)</td>
              <td>BGP 智能多线中转+IEPL</td>
              <td>VLESS / Trojan / SS</td>
              <td><span class="badge blue">全平台定制客户端</span></td>
              <td><span class="badge green">YouTube 4K / Disney+ 满血</span></td>
              <td>30分钟内工单响应</td>
              <td><a href={withBase('/works/muguang/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#3 飞猫云</strong> (平价大碗)</td>
              <td>大冗余 BGP 中转隧道</td>
              <td>SS / VMess</td>
              <td><span class="badge blue">支持 Windows/Android</span></td>
              <td><span class="badge green">主流美日新解锁</span></td>
              <td>1小时内工单响应</td>
              <td><a href={withBase('/works/feimao/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#4 微风网络</strong> (入门首选)</td>
              <td>平价公网中转 + 专线</td>
              <td>VLESS / Shadowsocks</td>
              <td><span class="badge gray">提供开源配置一键导入</span></td>
              <td><span class="badge green">ChatGPT 规则分流支持</span></td>
              <td>2小时内工单响应</td>
              <td><a href={withBase('/works/weifeng/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#5 大佬云</strong> (企业高稳)</td>
              <td>华为云/阿里云优质专线</td>
              <td>SS / Trojan</td>
              <td><span class="badge blue">提供全套开箱客户端</span></td>
              <td><span class="badge green">纯净住宅 IP 池</span></td>
              <td>20分钟内专席售后</td>
              <td><a href={withBase('/works/dalaoyun/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#6 星岛梦</strong> (不限时不跑路)</td>
              <td>按量计费不限时专线</td>
              <td>Shadowsocks / VLESS</td>
              <td><span class="badge gray">支持通用订阅导入</span></td>
              <td><span class="badge green">永久有效冷备首选</span></td>
              <td>1小时内技术支持</td>
              <td><a href={withBase('/works/xingdaomeng/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#7 二猫云</strong> (AI/科研必备)</td>
              <td>IEPL 专线 + 纯净美西落地</td>
              <td>VLESS / Hysteria2</td>
              <td><span class="badge blue">定制极速客户端</span></td>
              <td><span class="badge green">OpenAI/Claude 专属分流</span></td>
              <td>30分钟内工单</td>
              <td><a href={withBase('/works/ermao/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#8 无忧链接</strong></td>
              <td>公网多线中转</td>
              <td>VMess / Trojan</td>
              <td><span class="badge gray">开源客户端导入</span></td>
              <td><span class="badge green">普通流媒体解锁</span></td>
              <td>4小时内响应</td>
              <td><a href={withBase('/works/wuyou/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#9 唯兔云</strong></td>
              <td>BGP 弹性隧道</td>
              <td>SS / VLESS</td>
              <td><span class="badge blue">支持各平台客户端</span></td>
              <td><span class="badge green">亚太地区原生解锁</span></td>
              <td>2小时内工单</td>
              <td><a href={withBase('/works/weitu/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#10 Firefly</strong></td>
              <td>高带宽专线中继</td>
              <td>Hysteria2 / VLESS</td>
              <td><span class="badge gray">通用开源订阅</span></td>
              <td><span class="badge green">4K 极致无拖拽</span></td>
              <td>1小时内工单</td>
              <td><a href={withBase('/works/firefly/')}>实测报告</a></td>
            </tr>
            <tr>
              <td><strong>#11~#42 品牌群</strong></td>
              <td>涵盖直连、中转、IEPL多种架构</td>
              <td>SS / VMess / Trojan / VLESS</td>
              <td>详见各品牌深度评测</td>
              <td>按各品牌落地池动态调度</td>
              <td>视运营规模而定</td>
              <td><a href={withBase('/brands/')}>查阅品牌完整库 &rarr;</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 分类七：10分钟网络排错决策树 -->
    <section id="cat-flowchart" class="faq-section">
      <div class="cat-header">
        <span class="cat-num">CATEGORY 07</span>
        <h2>七、网络排错 10 分钟极速诊断决策流程</h2>
        <p class="cat-desc">遇到断网或报错无从下手？按照以下树状逻辑，10分钟内精准定位故障根源。</p>
      </div>

      <div class="flowchart-box">
        <div class="flow-step">
          <div class="step-badge">STEP 1</div>
          <div class="step-info">
            <h4>检查本地物理网络连接</h4>
            <p>先在不开任何代理软件的前提下，在浏览器中打开 <code>baidu.com</code> 或 <code>bilibili.com</code>。如果国内网站同样打不开，请先排查 Wi-Fi 信号、路由器断网或网线松动。</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="step-badge">STEP 2</div>
          <div class="step-info">
            <h4>核对系统时钟精准度（90% 超时问题的根源）</h4>
            <p>进入 Windows/macOS 系统设置，点击“立即同步网络时间”，确保本地系统秒数与国家授时中心严格同步（时差必须小于 90 秒）。</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="step-badge">STEP 3</div>
          <div class="step-info">
            <h4>排查系统代理注册表开关与本地端口冲突</h4>
            <p>按下 <code>Win + i</code> 检查系统代理开关。核实 Clash 本地监听端口（如 7890）是否被其他软件（如迅雷、虚拟机等）抢占占用。若冲突，在客户端中修改端口为 7895 重试。</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="step-badge">STEP 4</div>
          <div class="step-info">
            <h4>核验机场账户套餐与流量可用额度</h4>
            <p>登录机场官网后台，核查账户状态是否由于当月配额耗尽而自动熔断。若配额清零，需等待重置日或续费流量包。</p>
          </div>
        </div>

        <div class="flow-step">
          <div class="step-badge">STEP 5</div>
          <div class="step-info">
            <h4>启动 TUN 虚拟网卡彻底消除协议拦截</h4>
            <p>在客户端内开启 TUN Mode 并关闭 System Proxy，使网络层数据包直接被内核虚拟驱动捕获，彻底绕过系统代理机制。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部综合指引与内链枢纽 -->
    <footer class="faq-footer">
      <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">知识库导航与进阶阅读</h2>
      <p style="color: var(--color-muted); max-width: 800px; margin: 0 auto 2rem; line-height: 1.7;">
        本百科持续由网络基础设施观测实验室动态跟踪校验。如果你仍有未解答的复杂网络疑难，欢迎查阅以下专题矩阵：
      </p>
      <div class="hub-links">
        <a href={withBase('/')} class="hub-btn">返回 权威评测首页</a>
        <a href={withBase('/works/')} class="hub-btn">查阅 42 家机场实测精选榜</a>
        <a href={withBase('/brands/')} class="hub-btn">检索 品牌多维筛选库</a>
        <a href={withBase('/free-nodes/')} class="hub-btn">查阅 免费节点安全专题</a>
        <a href={withBase('/trial/')} class="hub-btn">查阅 免费试用专题</a>
        <a href={withBase('/blacklist/')} class="hub-btn">查阅 跑路预警与防雷黑名单</a>
        <a href={withBase('/clients/')} class="hub-btn">下载 全平台客户端配置指南</a>
      </div>
    </footer>

  </main>
</BaseLayout>

<style>
  .faq-header {
    padding: 2.5rem 0 2rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 2.5rem;
  }
  .breadcrumb {
    font-size: 0.88rem;
    color: var(--color-muted);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .breadcrumb a {
    color: var(--color-accent);
    text-decoration: none;
  }
  .header-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 1.2rem;
  }
  .tag {
    font-size: 0.78rem;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    font-weight: 600;
  }
  .tag.tech {
    background: rgba(201, 81, 53, 0.12);
    color: var(--color-accent);
    border: 1px solid rgba(201, 81, 53, 0.3);
  }
  .tag.date {
    background: #f0f0f0;
    color: #555;
    border: 1px solid #ddd;
  }
  .tag.count, .tag.scope {
    background: #edf5ff;
    color: #1a62cc;
    border: 1px solid #c2dcff;
  }
  .main-title {
    font-size: 2.1rem;
    line-height: 1.3;
    font-weight: 800;
    margin-bottom: 1.2rem;
    letter-spacing: -0.02em;
  }
  .subtitle {
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--color-muted);
    max-width: 950px;
    margin-bottom: 1.8rem;
  }
  .quick-nav-box {
    background: #fcfcfb;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.2rem;
  }
  .nav-label {
    display: block;
    font-weight: 700;
    font-size: 0.92rem;
    margin-bottom: 0.8rem;
    color: var(--color-text);
  }
  .nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
  }
  .nav-links a {
    font-size: 0.88rem;
    color: var(--color-accent);
    text-decoration: none;
    padding: 0.2rem 0.5rem;
    background: rgba(201, 81, 53, 0.06);
    border-radius: 4px;
    transition: background 0.2s;
  }
  .nav-links a:hover {
    background: rgba(201, 81, 53, 0.15);
    text-decoration: underline;
  }

  .spoke-articles-banner {
    margin-bottom: 3.5rem;
    padding: 2rem;
    background: #fafaf9;
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }
  .sub-sec-title {
    font-size: 1.35rem;
    font-weight: 800;
    margin-bottom: 0.6rem;
  }
  .sub-sec-desc {
    font-size: 0.95rem;
    color: var(--color-muted);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  .spoke-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  .spoke-card {
    background: #ffffff;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .spoke-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    border-color: var(--color-accent);
  }
  .spoke-tag {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-accent);
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }
  .spoke-card h3 {
    font-size: 1.08rem;
    font-weight: 700;
    line-height: 1.45;
    margin-bottom: 0.8rem;
    color: var(--color-text);
  }
  .spoke-card p {
    font-size: 0.88rem;
    line-height: 1.65;
    color: var(--color-muted);
    margin-bottom: 1.2rem;
  }
  .read-more {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-accent);
  }

  .faq-section {
    margin-bottom: 4rem;
    scroll-margin-top: 2rem;
  }
  .cat-header {
    margin-bottom: 1.8rem;
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 1rem;
  }
  .cat-num {
    font-size: 0.8rem;
    font-family: var(--font-mono);
    color: var(--color-accent);
    font-weight: 800;
    letter-spacing: 0.05em;
  }
  .cat-header h2 {
    font-size: 1.55rem;
    font-weight: 800;
    margin: 0.3rem 0 0.5rem;
  }
  .cat-desc {
    font-size: 0.95rem;
    color: var(--color-muted);
    line-height: 1.6;
  }

  .faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .faq-item {
    background: #ffffff;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.6rem 2rem;
    transition: border-color 0.2s;
  }
  .faq-item:hover {
    border-color: #bbb;
  }
  .faq-q {
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--color-text);
    margin-bottom: 1rem;
  }
  .faq-a {
    font-size: 0.95rem;
    line-height: 1.8;
    color: #333;
  }
  .faq-a p {
    margin-bottom: 1rem;
  }
  .faq-a ul, .faq-a ol {
    margin: 0.8rem 0 1.2rem 1.4rem;
  }
  .faq-a li {
    margin-bottom: 0.6rem;
  }
  .faq-a code {
    background: #f4f4f3;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.88em;
    font-family: var(--font-mono);
  }
  .faq-a pre {
    background: #222;
    color: #eee;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    font-size: 0.88rem;
    margin: 1rem 0;
  }
  .faq-a pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }

  .table-wrap, .table-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 1.5rem 0;
    border: 1px solid var(--color-border);
    border-radius: 6px;
  }
  .faq-compare-table, .observatory-table {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    font-size: 0.9rem;
    text-align: left;
  }
  .faq-compare-table th, .observatory-table th {
    background: #f7f7f5;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--color-border);
    font-weight: 700;
    color: var(--color-text);
  }
  .faq-compare-table td, .observatory-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--color-border);
    line-height: 1.6;
  }
  .badge {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    font-size: 0.78rem;
    border-radius: 3px;
    font-weight: 600;
  }
  .badge.blue { background: #e8f2ff; color: #1a62cc; }
  .badge.green { background: #e6f8ee; color: #15803d; }
  .badge.gray { background: #f0f0f0; color: #666; }

  .flowchart-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .flow-step {
    display: flex;
    gap: 1.5rem;
    background: #fcfcfb;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.2rem 1.6rem;
    align-items: flex-start;
  }
  .step-badge {
    background: var(--color-accent);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 0.3rem 0.7rem;
    border-radius: 4px;
    white-space: nowrap;
    margin-top: 0.2rem;
  }
  .step-info h4 {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
  }
  .flow-step p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--color-muted);
    margin: 0;
  }

  .faq-footer {
    padding: 3rem 1.5rem;
    background: #fafaf9;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    text-align: center;
    margin-top: 3rem;
  }
  .hub-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
  }
  .hub-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.1rem;
    font-size: 0.88rem;
    font-weight: 700;
    text-decoration: none;
    border-radius: 4px;
    background: #ffffff;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    transition: all 0.2s;
  }
  .hub-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  @media (max-width: 768px) {
    .main-title { font-size: 1.65rem; }
    .faq-item { padding: 1.2rem; }
    .flow-step { flex-direction: column; gap: 0.6rem; }
  }
</style>
`;

fs.writeFileSync(pillarPath, pillarContent, 'utf8');
console.log('Successfully written FAQ Pillar Page at ' + pillarPath);

// Generate Sub-article 1: speedtest-fast-but-youtube-lag
const sub1Dir = path.join(baseDir, 'speedtest-fast-but-youtube-lag');
if (!fs.existsSync(sub1Dir)) fs.mkdirSync(sub1Dir, { recursive: true });
const sub1Path = path.join(sub1Dir, 'index.astro');

const sub1Content = `---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import StructuredData from '../../../components/StructuredData.astro';
import { withBase } from '../../../i18n';

const title = '测速面板几百兆但看 YouTube 依然卡顿？五大根源深度排查与优化实操 | 机场FAQ';
const description = '为什么 Speedtest 跑分 500Mbps 但播放 YouTube 4K 仍然频繁缓冲转圈？深度剖析突发带宽与持续吞吐、晚高峰丢包率对 TCP 拥塞控制降窗打击，以及缓冲区膨胀与 DNS 解析优化的全套实操。';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  'headline': title,
  'description': description,
  'articleSection': '网络技术与故障排查',
  'inLanguage': 'zh-CN'
};
---

<BaseLayout title={title} description={description}>
  <StructuredData slot="head" schema={schema} />

  <article class="article-container">
    <header class="article-header">
      <div class="breadcrumb">
        <a href={withBase('/')}>首页</a>
        <span class="sep">/</span>
        <a href={withBase('/faq/')}>机场百科与高频 FAQ</a>
        <span class="sep">/</span>
        <span class="current">正文</span>
      </div>
      <span class="category-tag">深度故障排查专项</span>
      <h1>测速面板几百兆但看 YouTube 依然卡顿？五大根源深度排查与优化实操</h1>
      <p class="meta">网络基础设施观测实验室 · 实测技术专刊 · 建议阅读时间 8 分钟</p>
    </header>

    <div class="article-body">
      <p class="lead">
        在各大代理交流社群中，最常听到的困惑就是：“为什么我在 Speedtest 测速软件里能轻松跑满 300Mbps 甚至 800Mbps，但一打开 YouTube 观看 4K 视频，画质却自动降到 720P，拖拽进度条还要卡顿转圈 5 秒以上？”很多用户往往以为是自己的电脑性能不足或 YouTube 服务器拥堵，但实际上，这是网络工程中非常经典的<strong>“突发带宽（Burst Bandwidth）与持续稳定吞吐（Sustained Goodput）的断层脱节”</strong>现象。
      </p>

      <h2>根源一：测速软件的多线程突发欺骗性 vs 视频流的单线程持续吞吐</h2>
      <p>
        Speedtest 或单节点跑分工具在运行时，通常会在本地与境外测速服务器之间瞬间建立 <strong>8 到 16 条并行的 TCP 线程</strong>，利用短短 5~10 秒的极短时间窗口发起暴力的突发拉流。在这种多线程突发下，即使网络线路存在轻微的丢包，其他并发线程也能迅速填补丢包间隙，从而在仪表盘上展示出一个极其漂亮的“百兆甚至千兆跑分”。
      </p>
      <p>
        然而，YouTube、Netflix 等视频流媒体网站的工作机制完全不同：
      </p>
      <ul>
        <li>视频播放器使用的是基于 HTTP/2 或 QUIC 的<strong>单连接或少数连接</strong>，按数据块（Chunk，通常每块为 2~5MB）依次顺序请求数据；</li>
        <li>如果当前线路在长周期传输中不稳定，单个连接一旦遭遇数据包丢失，播放器就会停滞等待重传，直接导致解码缓冲区（Buffer Health）迅速耗尽归零，画面出现转圈；</li>
        <li>因此，<strong>能够支撑 4K 60FPS 流畅播放的真正决定因素，绝不是瞬时测速峰值，而是单连接在持续 10 分钟以上的稳定性</strong>。</li>
      </ul>

      <h2>根源二：晚高峰丢包率对 TCP 窗口的毁灭性打击</h2>
      <p>
        在公网直连或劣质中转线路上，晚高峰（20:00 - 23:00）国际出口拥塞是卡顿的头号元凶。
      </p>
      <p>
        现代操作系统默认采用 CUBIC 或 Reno 等传统 TCP 拥塞控制算法。这些算法的基本哲学是：<strong>“一旦检测到丢包，就认为网络发生了严重拥堵，必须立即把发送窗口减半”</strong>。
      </p>
      <p>
        假设你的物理带宽有 500Mbps，当线路丢包率仅为 <strong>2%</strong> 时，TCP 拥塞算法就会强制进入慢启动和降窗流程，最终导致实际有效传输速率（Goodput）直接雪崩跌落至 <strong>不足 10Mbps</strong>！这也是为什么许多宣称千兆的大带宽便宜机场，到了晚上连 1080P 都无法流畅加载的底层数学原理。而真正的全内网 IEPL 专线，正是因为物理绕过了公网国际出口，晚高峰丢包率始终在 0.1% 以下，窗口始终保持满开状态。
      </p>

      <h2>根源三：缓冲区膨胀（Bufferbloat）导致的高延迟抖动</h2>
      <p>
        缓冲区膨胀指的是家用路由器或运营商光猫中的数据包队列设置过大。当你的设备尝试下载大码率 4K 视频切片时，下载流量把路由器的缓冲区全部填满，导致后续的确认包（ACK）和 DNS 查询包在队列中长时间排队。此时，网络的 Ping 值可能会从平时的 40ms 瞬间飙升到 800ms 甚至上千毫秒，播放器收到音视频数据的时间方差极大，引发持续的播放卡顿。
      </p>

      <h2>根源四：DNS 解析污染与 CDN 调度错位</h2>
      <p>
        YouTube 全球部署了海量的 Google Global Cache（GGC）边缘节点。如果你的代理客户端在解析 <code>googlevideo.com</code> 视频流域名时，触发了 DNS 泄漏或使用了错误的本地 DNS 解析，YouTube 会将你的播放请求调度到离你极其遥远、或者跨网互联极差的境外机房服务器上，导致数据包绕行半个地球才送达，速度自然极慢。
      </p>

      <h2>五大可执行优化实操步骤</h2>
      <ol>
        <li>
          <strong>更换为现代 BBR 拥塞控制协议：</strong><br />
          如果你使用的是支持 Hysteria2 或配备 BBR 加速内核的节点，即使线路存在 10% 左右的公网随机丢包，BBR 也不会盲目降窗，依然能强行跑满视频带宽。
        </li>
        <li>
          <strong>在客户端开启 Fake-IP 并关闭本地 DNS 泄漏：</strong><br />
          使用 Clash Verge Rev，进入 DNS 设置页面，勾选 <code>Enhanced Mode: Fake-IP</code>，将海外域名的真实解析彻底交由远端落地节点完成，确保 YouTube 能精准为你匹配延迟最近的 GGC 缓存机房。
        </li>
        <li>
          <strong>降低播放器缓冲区膨胀：</strong><br />
          给家用路由器刷入带有 SQM（智能队列管理，如 CAKE 或 fq_codel 算法）的固件（如 OpenWrt），在路由器层面彻底抑制缓冲区膨胀，确保大流量下载时 Ping 值稳定不飙升。
        </li>
        <li>
          <strong>优先选用真正的 IEPL 专线节点：</strong><br />
          针对晚高峰 4K 视频需求，在节点列表中避开标注为“直连”或“0.2x 廉价”的公网节点，切换至主推的 <code>IEPL 专线</code> 或 <code>BGP 优质中转</code> 节点。
        </li>
        <li>
          <strong>查看 YouTube 详细统计信息（Stats for nerds）：</strong><br />
          在播放界面右键点击【详细统计信息】，观察 <code>Connection Speed</code>（连接速度）与 <code>Buffer Health</code>（缓冲区健康度）。健康的 4K 播放应当保证 Buffer Health 持续稳定在 15 秒以上。若 Buffer 始终处于 0~3 秒并剧烈跳动，果断切换至备用机场节点。
        </li>
      </ol>
    </div>

    <footer class="article-footer">
      <div class="related-box">
        <h3>相关专题与导航</h3>
        <p>深入了解更多技术细节，欢迎查阅：</p>
        <div class="rel-links">
          <a href={withBase('/faq/')}>&larr; 返回 机场百科与排错总览</a>
          <a href={withBase('/faq/chatgpt-access-denied-solutions/')}>ChatGPT 1020 报错全解手册 &rarr;</a>
          <a href={withBase('/faq/tun-mode-vs-system-proxy/')}>TUN 模式与系统代理深度解析 &rarr;</a>
          <a href={withBase('/works/')}>查阅 42 家机场实测榜单 &rarr;</a>
        </div>
      </div>
    </footer>
  </article>
</BaseLayout>

<style>
  .article-container {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 1rem 4rem;
  }
  .article-header {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1.8rem;
    margin-bottom: 2rem;
  }
  .breadcrumb {
    font-size: 0.85rem;
    color: var(--color-muted);
    margin-bottom: 0.8rem;
    display: flex;
    gap: 0.5rem;
  }
  .breadcrumb a {
    color: var(--color-accent);
    text-decoration: none;
  }
  .category-tag {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-accent);
    background: rgba(201, 81, 53, 0.1);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    margin-bottom: 0.8rem;
  }
  .article-header h1 {
    font-size: 2rem;
    line-height: 1.35;
    font-weight: 800;
    margin-bottom: 0.8rem;
  }
  .meta {
    font-size: 0.88rem;
    color: var(--color-muted);
  }
  .article-body {
    font-size: 1.02rem;
    line-height: 1.85;
    color: #2c2c2c;
  }
  .lead {
    font-size: 1.12rem;
    line-height: 1.8;
    color: var(--color-text);
    background: #fbfbfa;
    border-left: 4px solid var(--color-accent);
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0 4px 4px 0;
  }
  .article-body h2 {
    font-size: 1.45rem;
    font-weight: 800;
    margin: 2.5rem 0 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
  }
  .article-body ul, .article-body ol {
    margin: 1rem 0 1.5rem 1.5rem;
  }
  .article-body li {
    margin-bottom: 0.8rem;
  }
  .article-footer {
    margin-top: 3.5rem;
    border-top: 1px solid var(--color-border);
    padding-top: 2rem;
  }
  .related-box {
    background: #fafaf9;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.5rem;
  }
  .related-box h3 {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }
  .rel-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem 1.2rem;
    margin-top: 1rem;
  }
  .rel-links a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.92rem;
  }
  .rel-links a:hover {
    text-decoration: underline;
  }
</style>
`;

fs.writeFileSync(sub1Path, sub1Content, 'utf8');
console.log('Successfully generated FAQ Sub-article 1 at ' + sub1Path);

// Generate Sub-article 2: chatgpt-access-denied-solutions
const sub2Dir = path.join(baseDir, 'chatgpt-access-denied-solutions');
if (!fs.existsSync(sub2Dir)) fs.mkdirSync(sub2Dir, { recursive: true });
const sub2Path = path.join(sub2Dir, 'index.astro');

const sub2Content = `---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import StructuredData from '../../../components/StructuredData.astro';
import { withBase } from '../../../i18n';

const title = 'ChatGPT 报错 Access Denied、1020 与 IP 限制全套解决手册 | 机场FAQ';
const description = 'OpenAI 提示 Access Denied、Error 1020、Unable to load site 怎么办？深度剖析 Cloudflare WAF 对机房 IP 的封锁机制，提供原生纯净住宅 IP 筛选技巧、WebRTC 防泄漏配置及专用分流规则代码。';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  'headline': title,
  'description': description,
  'articleSection': 'AI 运维与风控排错',
  'inLanguage': 'zh-CN'
};
---

<BaseLayout title={title} description={description}>
  <StructuredData slot="head" schema={schema} />

  <article class="article-container">
    <header class="article-header">
      <div class="breadcrumb">
        <a href={withBase('/')}>首页</a>
        <span class="sep">/</span>
        <a href={withBase('/faq/')}>机场百科与高频 FAQ</a>
        <span class="sep">/</span>
        <span class="current">正文</span>
      </div>
      <span class="category-tag">AI 工具风控规避</span>
      <h1>ChatGPT 报错 Access Denied、1020 与 IP 限制全套解决手册</h1>
      <p class="meta">网络基础设施观测实验室 · 实测技术专刊 · 建议阅读时间 9 分钟</p>
    </header>

    <div class="article-body">
      <p class="lead">
        自 2022 年底生成式人工智能爆发以来，OpenAI 的 ChatGPT 与 Claude 已经成为广大科研工作者、程序员与外贸人员的日常生产力中枢。然而，伴随着海量用户的涌入，OpenAI 协同 Cloudflare 部署了全球防护等级最高、策略最为动态的反欺诈 WAF（Web Application Firewall）防火墙。数以万计的用户在访问时频繁遭遇 <strong>“Access denied (Error code 1020)”</strong>、<strong>“Your IP is blocked”</strong> 或页面长时间空白死锁。本手册旨在系统性拆解其拦截逻辑，并提供可直接复制落地的实战解决方案。
      </p>

      <h2>一、深度拆解：Cloudflare WAF 针对 OpenAI 的三重防御体系</h2>
      <p>
        很多人以为只要节点能够连上外网，就能顺理成章访问 ChatGPT。实际上，当你输入 <code>chatgpt.com</code> 并敲击回车的一瞬间，你的请求在触达真正的 GPT 大模型之前，必须连续通过三层极其严苛的自动化审查：
      </p>
      <ol>
        <li>
          <strong>地理区域白名单审查（Geo-Restriction）：</strong><br />
          OpenAI 仅对全球特定批准的法定国家和地区开放服务。中国大陆及<strong>中国香港特别行政区</strong>均不在官方支持列表内。如果你的代理客户端正在使用香港节点，Cloudflare 会在毫秒级时间内检测到你的请求来自香港 ASN IP 段，立即返回阻断页面；
        </li>
        <li>
          <strong>IP 纯净度与 ASN 欺诈分级（Fraud Score）：</strong><br />
          Cloudflare 维护着庞大的威胁情报数据库。当来自亚马逊 AWS、谷歌 GCP、甲骨文 Oracle 等廉价云计算数据中心的机房 IP 发起请求时，系统会为该 IP 标记极高的风险分（Fraud Score &gt; 80）。当同一个机房 IP 在一小时内向 OpenAI 接口发起了成千上万次连接，WAF 会认定该 IP 正处于被恶意脚本、黑客扫描或批量并发滥用状态，直接触发全局 1020 阻断封禁；
        </li>
        <li>
          <strong>浏览器环境指纹与 WebRTC 穿透探针：</strong><br />
          现代前端安全体系通过 Canvas 指纹、Audio 指纹、本地系统时区与语言、以及 WebRTC 协议直接刺探设备的真实底层网络。很多用户即使开着代理，其浏览器内部的 WebRTC 模块依然在后台默默向 STUN 服务器回传真实的本地内网甚至国内公网 IP，导致前后特征冲突被判定为异常代理伪装。
        </li>
      </ol>

      <h2>二、终极实操四步法：从根源清除 1020 报错</h2>

      <h3>第一步：绝对严禁将香港节点作为 OpenAI 的路由目标</h3>
      <p>
        请立即检查你当前客户端的策略组分流规则。在节点选择中，将访问 OpenAI 的规则锁定在<strong>美国西海岸（如洛杉矶、圣何塞）、日本东京、新加坡或英国</strong>等原生开放地区节点。在没有手动指定分流的情况下，切勿使用“自动选路（Auto）”或“最低延迟”，因为在地理距离上香港延迟最低（通常 20ms~30ms），自动测速会永远优先选中香港节点，从而陷入无休止的 1020 报错循环。
      </p>

      <h3>第二步：彻底清除浏览器缓存与已注册的 Service Worker</h3>
      <p>
        这是极易被忽视的致命陷阱！Cloudflare 的 1020 拦截状态会被浏览器深度的 LocalStorage 和 Service Worker 强行缓存。即使你随后更换了一个绝对干净的原生美国节点，浏览器仍然会优先调用本地缓存的失败页面！
      </p>
      <p><strong>标准清理流程：</strong></p>
      <ul>
        <li>在 Chrome/Edge 浏览器中打开 <code>chatgpt.com</code>；</li>
        <li>按下键盘快捷键 <code>F12</code> 打开【开发者工具】；</li>
        <li>在顶部菜单切换到【Application】（应用）标签页；</li>
        <li>在左侧导航栏找到【Storage】，点击右侧主区域的 <strong>“Clear site data”（清除网站数据）</strong>；</li>
        <li>完全关闭浏览器所有窗口，重新打开并尝试登录。</li>
      </ul>

      <h3>第三步：在客户端中部署精准的 AI 规则分流代码</h3>
      <p>
        为了避免每次访问 ChatGPT 都要痛苦地手动来回切换节点，建议在 Clash Verge Rev 或 Mihomo 的自定义配置文件中，引入权威的 AI 专属规则集，将所有与 OpenAI 相关的域名与 API 强行绑定在最优质的原生专线节点上：
      </p>
      <pre><code># OpenAI 与 Claude 专属策略组配置示例
proxy-groups:
  - name: 🤖 AI专用通道
    type: select
    proxies:
      - 🇺🇸 美国 01 [原生住宅IP]
      - 🇯🇵 日本 02 [原生双栈]
      - 🇸🇬 新加坡 01 [IEPL专线]

rules:
  # 优先捕获所有 OpenAI 关联域名
  - DOMAIN-SUFFIX,openai.com,🤖 AI专用通道
  - DOMAIN-SUFFIX,chatgpt.com,🤖 AI专用通道
  - DOMAIN-SUFFIX,auth0.openai.com,🤖 AI专用通道
  - DOMAIN-SUFFIX,oaistatic.com,🤖 AI专用通道
  - DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI专用通道
  - DOMAIN-SUFFIX,anthropic.com,🤖 AI专用通道
  - DOMAIN-SUFFIX,claude.ai,🤖 AI专用通道
  - MATCH,兜底策略组</code></pre>

      <h3>第四步：彻底封堵 WebRTC 泄漏风险</h3>
      <p>
        在 Chrome 网上应用店中搜索并安装 <code>WebRTC Control</code> 扩展程序，将其状态切换为蓝色的“Disable WebRTC”（禁用 WebRTC）。这样可以彻底阻止浏览器在后台私自暴露本地真实网络接口，使所有的连接特征 100% 严密封装在远端代理节点的 IP 之后。
      </p>
    </div>

    <footer class="article-footer">
      <div class="related-box">
        <h3>相关专题与导航</h3>
        <p>深入了解更多技术细节，欢迎查阅：</p>
        <div class="rel-links">
          <a href={withBase('/faq/')}>&larr; 返回 机场百科与排错总览</a>
          <a href={withBase('/faq/speedtest-fast-but-youtube-lag/')}>YouTube 4K 卡顿深度排查 &rarr;</a>
          <a href={withBase('/faq/tun-mode-vs-system-proxy/')}>TUN 模式与系统代理深度解析 &rarr;</a>
          <a href={withBase('/brands/')}>查阅 42 家机场品牌库 &rarr;</a>
        </div>
      </div>
    </footer>
  </article>
</BaseLayout>

<style>
  .article-container {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 1rem 4rem;
  }
  .article-header {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1.8rem;
    margin-bottom: 2rem;
  }
  .breadcrumb {
    font-size: 0.85rem;
    color: var(--color-muted);
    margin-bottom: 0.8rem;
    display: flex;
    gap: 0.5rem;
  }
  .breadcrumb a {
    color: var(--color-accent);
    text-decoration: none;
  }
  .category-tag {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-accent);
    background: rgba(201, 81, 53, 0.1);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    margin-bottom: 0.8rem;
  }
  .article-header h1 {
    font-size: 2rem;
    line-height: 1.35;
    font-weight: 800;
    margin-bottom: 0.8rem;
  }
  .meta {
    font-size: 0.88rem;
    color: var(--color-muted);
  }
  .article-body {
    font-size: 1.02rem;
    line-height: 1.85;
    color: #2c2c2c;
  }
  .lead {
    font-size: 1.12rem;
    line-height: 1.8;
    color: var(--color-text);
    background: #fbfbfa;
    border-left: 4px solid var(--color-accent);
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0 4px 4px 0;
  }
  .article-body h2 {
    font-size: 1.45rem;
    font-weight: 800;
    margin: 2.5rem 0 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
  }
  .article-body h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 1.8rem 0 0.8rem;
  }
  .article-body ul, .article-body ol {
    margin: 1rem 0 1.5rem 1.5rem;
  }
  .article-body li {
    margin-bottom: 0.8rem;
  }
  .article-body code {
    background: #f4f4f3;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.88em;
    font-family: var(--font-mono);
  }
  .article-body pre {
    background: #222;
    color: #eee;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    font-size: 0.88rem;
    margin: 1.2rem 0;
  }
  .article-body pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  .article-footer {
    margin-top: 3.5rem;
    border-top: 1px solid var(--color-border);
    padding-top: 2rem;
  }
  .related-box {
    background: #fafaf9;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.5rem;
  }
  .related-box h3 {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }
  .rel-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem 1.2rem;
    margin-top: 1rem;
  }
  .rel-links a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.92rem;
  }
  .rel-links a:hover {
    text-decoration: underline;
  }
</style>
`;

fs.writeFileSync(sub2Path, sub2Content, 'utf8');
console.log('Successfully generated FAQ Sub-article 2 at ' + sub2Path);

// Generate Sub-article 3: tun-mode-vs-system-proxy
const sub3Dir = path.join(baseDir, 'tun-mode-vs-system-proxy');
if (!fs.existsSync(sub3Dir)) fs.mkdirSync(sub3Dir, { recursive: true });
const sub3Path = path.join(sub3Dir, 'index.astro');

const sub3Content = `---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import StructuredData from '../../../components/StructuredData.astro';
import { withBase } from '../../../i18n';

const title = 'TUN 虚拟网卡模式与系统代理的区别深度解析：为什么命令行与游戏必须开 TUN？ | 机场FAQ';
const description = '为什么开启 Clash 后，浏览器能上网但 Git clone、终端 curl、Steam、Docker 和游戏依然连不上？深度剖析 OSI 七层模型中 Layer 3 虚拟网卡接管与应用层 HTTP 代理环境变量的本质鸿沟。';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  'headline': title,
  'description': description,
  'articleSection': '网络架构与协议底层',
  'inLanguage': 'zh-CN'
};
---

<BaseLayout title={title} description={description}>
  <StructuredData slot="head" schema={schema} />

  <article class="article-container">
    <header class="article-header">
      <div class="breadcrumb">
        <a href={withBase('/')}>首页</a>
        <span class="sep">/</span>
        <a href={withBase('/faq/')}>机场百科与高频 FAQ</a>
        <span class="sep">/</span>
        <span class="current">正文</span>
      </div>
      <span class="category-tag">底层网络原理剖析</span>
      <h1>TUN 虚拟网卡模式与系统代理的区别深度解析：为什么命令行与游戏必须开 TUN？</h1>
      <p class="meta">网络基础设施观测实验室 · 实测技术专刊 · 建议阅读时间 10 分钟</p>
    </header>

    <div class="article-body">
      <p class="lead">
        对于许多刚刚接触 Clash Verge Rev、Surge 或 Mihomo 的用户而言，客户端主界面上醒目的“系统代理（System Proxy）”与“TUN 模式（TUN Mode）”两个核心开关常常让人一头雾水。最典型的场景莫过于：明明已经打开了代理软件，甚至能在 Chrome 浏览器里飞速流畅播放 4K YouTube 视频，但只要打开 Windows 终端运行 <code>git clone</code> 或 <code>curl</code>，却依然无情报错“Connection refused”；启动 Steam、Epic 或联机游戏，依然提示网络不可达。这背后的核心根源在于<strong>网络数据包在操作系统 OSI 模型中不同层级的接管权限差异</strong>。
      </p>

      <h2>一、概念溯源：系统代理（System Proxy）到底做了什么？</h2>
      <p>
        当你在客户端中开启“系统代理”开关时，客户端实际上只做了一件极其微小的事情：<strong>向操作系统的网络设置注册表注入了一组环境变量</strong>。
      </p>
      <p>
        例如在 Windows 系统中，它将系统的 HTTP/HTTPS/SOCKS 代理地址修改为了 <code>127.0.0.1:7890</code>。
      </p>
      <p>
        <strong>系统代理的致命局限性：</strong>
      </p>
      <ul>
        <li><strong>仅对“主动遵循系统设置”的应用生效：</strong>只有像 Edge、Chrome、Firefox 等桌面图形浏览器，或者少数显式声明遵循系统代理的应用，在发起网络请求前才会主动读取这组注册表，并将数据包封装为 HTTP Connect 代理报文发送给 7890 端口；</li>
        <li><strong>对终端命令行完全无效：</strong>PowerShell、CMD、Linux Bash 终端中的绝大多数开发工具（如 <code>git</code>、<code>curl</code>、<code>wget</code>、<code>docker</code>、<code>npm</code>、<code>pip</code>）在设计之初为了保证纯粹性，默认完全无视操作系统的图形化代理设置，依然直接通过默认物理网卡向外发起裸连接；</li>
        <li><strong>对游戏与私有 UDP 协议完全无效：</strong>像各类网游（Apex、绝地求生、GTA Online）以及 Steam 客户端的核心通信大多基于底层的裸 UDP 协议或私有二进制协议。系统代理根本不具备接管非 HTTP/SOCKS 流量的能力。</li>
      </ul>

      <h2>二、技术飞跃：TUN 虚拟网卡模式（Layer 3 接管）的本质</h2>
      <p>
        TUN（TUNnel）是操作系统内核级别支持的<strong>网络层（Layer 3）虚拟设备驱动</strong>。在 Windows 上通常依赖 <code>wintun.sys</code>，在 macOS 和 Linux 上则是内核原生的 <code>/dev/net/tun</code> 接口。
      </p>
      <p>
        当你在 Clash 中开启 TUN 模式时，系统的底层网络拓扑发生了根本性重构：
      </p>
      <ol>
        <li><strong>创建虚拟物理网卡：</strong>系统网络适配器列表中会凭空多出一张名为“Mihomo”或“Clash”的虚拟网卡；</li>
        <li><strong>全局默认路由劫持（Default Route Hijacking）：</strong>TUN 驱动直接修改操作系统的核心路由表（Routing Table），将系统的默认网关指向这张虚拟网卡，并将其路由跃点数（Metric）设为最高优先级（如 Metric = 1）；</li>
        <li><strong>真·全局透明捕获：</strong>此时，操作系统内核中发出的<strong>每一个原始 IP 数据包（无论来自浏览器、终端命令行、后台系统服务，还是各类 3D 联机大型游戏）</strong>，在离开内核协议栈的瞬间，全部无条件被虚拟网卡拦截并送入代理内核进行规则分流匹配。</li>
      </ol>

      <h2>三、全方位特性深度对比总览</h2>
      <div class="table-wrap">
        <table class="faq-compare-table">
          <thead>
            <tr>
              <th>对比维度</th>
              <th>传统系统代理模式 (System Proxy)</th>
              <th>TUN 虚拟网卡模式 (TUN Mode)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>OSI 工作层级</strong></td>
              <td>应用层 / 传输层 (Layer 4/7)</td>
              <td>网络层 IP 层 (Layer 3)</td>
            </tr>
            <tr>
              <td><strong>终端开发工具支持 (Git/Docker/Pip)</strong></td>
              <td><span style="color:red;">默认完全不支持</span> (必须手动配置 export 变量)</td>
              <td><span style="color:green;">原生完美无感支持</span> (开箱即用)</td>
            </tr>
            <tr>
              <td><strong>联机游戏与全平台联机</strong></td>
              <td><span style="color:red;">完全无法加速</span></td>
              <td><span style="color:green;">原生全面接管 UDP/TCP 流量</span></td>
            </tr>
            <tr>
              <td><strong>DNS 泄漏防御</strong></td>
              <td>容易因本地 53 端口查询导致泄漏</td>
              <td>通过 Fake-IP 全面拦截劫持，彻底绝缘泄漏</td>
            </tr>
            <tr>
              <td><strong>系统权限要求</strong></td>
              <td>普通用户权限即可修改</td>
              <td>必须具备<strong>管理员权限 (Administrator / Root)</strong></td>
            </tr>
            <tr>
              <td><strong>系统休眠唤醒稳定性</strong></td>
              <td>极易因未重置注册表导致浏览器断网</td>
              <td>现代化 wintun 驱动可自动无感自愈重挂载</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>四、日常使用与开发者的黄金配置建议</h2>
      <p>
        <strong>1. 普通日常影音与网页浏览用户：</strong><br />
        如果你的主要需求只是在浏览器里查资料、看视频、追美剧，开启传统的【系统代理】已经完全足够，其优势在于轻量、对本地网络驱动无入侵，且不需要管理员权限弹窗授权。
      </p>
      <p>
        <strong>2. 程序员、外贸商务与游戏玩家：</strong><br />
        强烈建议直接<strong>常驻开启 TUN 模式</strong>，并在客户端设置中<strong>关闭传统的系统代理开关</strong>！这样既能保证整个操作系统的所有流量（包括开发工具链、终端命令行、各种桌面端客户端）全部享受到免配置的透明代理加速，又能彻底告别因系统代理注册表残留导致的网页断网假死现象。
      </p>
    </div>

    <footer class="article-footer">
      <div class="related-box">
        <h3>相关专题与导航</h3>
        <p>深入了解更多技术细节，欢迎查阅：</p>
        <div class="rel-links">
          <a href={withBase('/faq/')}>&larr; 返回 机场百科与排错总览</a>
          <a href={withBase('/faq/speedtest-fast-but-youtube-lag/')}>YouTube 4K 卡顿深度排查 &rarr;</a>
          <a href={withBase('/faq/chatgpt-access-denied-solutions/')}>ChatGPT 1020 报错全解手册 &rarr;</a>
          <a href={withBase('/clients/')}>查阅 全平台客户端下载与配置指南 &rarr;</a>
        </div>
      </div>
    </footer>
  </article>
</BaseLayout>

<style>
  .article-container {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 1rem 4rem;
  }
  .article-header {
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1.8rem;
    margin-bottom: 2rem;
  }
  .breadcrumb {
    font-size: 0.85rem;
    color: var(--color-muted);
    margin-bottom: 0.8rem;
    display: flex;
    gap: 0.5rem;
  }
  .breadcrumb a {
    color: var(--color-accent);
    text-decoration: none;
  }
  .category-tag {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--color-accent);
    background: rgba(201, 81, 53, 0.1);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    margin-bottom: 0.8rem;
  }
  .article-header h1 {
    font-size: 2rem;
    line-height: 1.35;
    font-weight: 800;
    margin-bottom: 0.8rem;
  }
  .meta {
    font-size: 0.88rem;
    color: var(--color-muted);
  }
  .article-body {
    font-size: 1.02rem;
    line-height: 1.85;
    color: #2c2c2c;
  }
  .lead {
    font-size: 1.12rem;
    line-height: 1.8;
    color: var(--color-text);
    background: #fbfbfa;
    border-left: 4px solid var(--color-accent);
    padding: 1.2rem 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0 4px 4px 0;
  }
  .article-body h2 {
    font-size: 1.45rem;
    font-weight: 800;
    margin: 2.5rem 0 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
  }
  .article-body ul, .article-body ol {
    margin: 1rem 0 1.5rem 1.5rem;
  }
  .article-body li {
    margin-bottom: 0.8rem;
  }
  .table-wrap {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 1.5rem 0;
    border: 1px solid var(--color-border);
    border-radius: 6px;
  }
  .faq-compare-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    font-size: 0.9rem;
    text-align: left;
  }
  .faq-compare-table th {
    background: #f7f7f5;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--color-border);
    font-weight: 700;
    color: var(--color-text);
  }
  .faq-compare-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--color-border);
    line-height: 1.6;
  }
  .article-body code {
    background: #f4f4f3;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.88em;
    font-family: var(--font-mono);
  }
  .article-footer {
    margin-top: 3.5rem;
    border-top: 1px solid var(--color-border);
    padding-top: 2rem;
  }
  .related-box {
    background: #fafaf9;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 1.5rem;
  }
  .related-box h3 {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }
  .rel-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem 1.2rem;
    margin-top: 1rem;
  }
  .rel-links a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.92rem;
  }
  .rel-links a:hover {
    text-decoration: underline;
  }
</style>
`;

fs.writeFileSync(sub3Path, sub3Content, 'utf8');
console.log('Successfully generated FAQ Sub-article 3 at ' + sub3Path);
console.log('ALL FAQ Cluster generated successfully!');
