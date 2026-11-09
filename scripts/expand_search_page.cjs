const fs = require('fs');
const path = require('path');

const searchPath = path.join(__dirname, '../src/pages/search.astro');
const { BRANDS } = require('../src/data/brands.ts');

// 1. 构建 42 家机场全要素参数表格行 HTML
const brandsTableRows = BRANDS.map((b) => {
  const isMeasured = b.hasSpeedtestImage || b.dataStatus === 'measured';
  const statusBadge = isMeasured
    ? '<span class="tag-status measured">🟢 实测跑分</span>'
    : '<span class="tag-status vendor">🔵 厂商档案</span>';
  
  return `<tr>
    <td><strong>Top ${String(b.rank).padStart(2, '0')}</strong></td>
    <td><strong>${b.name}</strong></td>
    <td>${b.lineType}</td>
    <td><code>${b.protocol || 'SS/Trojan'}</code></td>
    <td>${b.entryPrice}</td>
    <td>${statusBadge}</td>
    <td>${b.verifiedDate}</td>
    <td><a href="/works/${b.slug}/" class="table-link">查阅评测 &rarr;</a></td>
  </tr>`;
}).join('\n');

// 2. 构建 42 家机场多维搜索意图与画像卡片（专著级深度内容）
const brandProfilesHtml = BRANDS.map((b) => {
  const isMeasured = b.hasSpeedtestImage || b.dataStatus === 'measured';
  const statusText = isMeasured ? '具备晚高峰 32 线程测速图与解锁截图' : '经由厂商工单与自动化探针周期抽检核实';
  const featuresText = (b.features && b.features.length > 0) 
    ? b.features.map(f => `<li>${f}</li>`).join('') 
    : '<li>主流节点全覆盖，支持常见流媒体解锁与网页加速</li>';

  return `
  <div class="brand-profile-card" id="brand-${b.slug}">
    <div class="profile-header">
      <div class="profile-title-group">
        <span class="rank-badge">排名 Top ${String(b.rank).padStart(2, '0')}</span>
        <h3>${b.name}</h3>
      </div>
      <span class="profile-line-type">${b.lineType}</span>
    </div>
    <div class="profile-meta-grid">
      <div class="meta-item">
        <span class="meta-label">通信协议：</span>
        <span class="meta-val"><code>${b.protocol || 'Shadowsocks / Trojan'}</code></span>
      </div>
      <div class="meta-item">
        <span class="meta-label">门槛价格：</span>
        <span class="meta-val">${b.entryPrice}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">数据状态：</span>
        <span class="meta-val">${statusText}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">核验日期：</span>
        <span class="meta-val">${b.verifiedDate}</span>
      </div>
    </div>
    <div class="profile-body">
      <p class="profile-summary">
        <strong>搜索意图画像：</strong>当用户检索 <code>${b.name}</code>、<code>${b.lineType}</code> 或相关场景时，该品牌主要承接针对 ${b.name} 的线路可靠性、晚高峰抗丢包表现与真实流媒体支持的搜索需求。
      </p>
      <div class="profile-features">
        <span class="features-label">核心技术特性与网络参数：</span>
        <ul>
          ${featuresText}
        </ul>
      </div>
      <div class="profile-actions">
        <a href="/works/${b.slug}/" class="button action-btn">查阅 ${b.name} 完整评测报告 &rarr;</a>
        ${b.affLink ? `<a href="${b.affLink}" target="_blank" rel="nofollow sponsored noopener" class="button promo-btn">直达 ${b.name} 官网</a>` : ''}
      </div>
    </div>
  </div>
  `;
}).join('\n');

const content = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import StructuredData from '../components/StructuredData.astro';
import { withBase } from '../lib/url';
import { SITE } from '../consts';

const bundlePath = withBase('/pagefind/');

const title = '机场与网络加速知识库站内检索 — 机场pics (jichangtuijian.pics)';
const description = '机场pics站内智能检索中心：系统收录42家主流网络加速品牌深度测评、IEPL/IPLC内网专线节点参数、流媒体与AI原生解锁审计、全平台代理客户端下载配置教程及晚高峰排障指南。';

const site = Astro.site ?? new URL(Astro.url.origin);
const absolute = (path: string) => new URL(withBase(path), site).href;

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.title,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absolute('/search/?q={search_term_string}'),
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: '站内检索与知识库索引', item: absolute('/search/') },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '如何在站内快速检索适合自己宽带运营商的机场？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '中国电信用户建议直接检索“电信优化”或“IEPL专线”，优先选用具备华东/华南优质BGP入口的服务商；中国联通用户可检索“9929”或“BGP中转”，联通骨干网互联质量较好；中国移动用户建议检索“CMI”或“移动直连”，在香港和新加坡方向具有极低延迟优势。',
        },
      },
      {
        '@type': 'Question',
        name: '搜索特定流媒体（如 Netflix / Disney+）解锁时需要注意什么？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '搜索流媒体支持时，务必核查评测中是否标明“原生双栈IP”或“非自制剧解锁”。部分劣质节点仅能打开Netflix自制剧（如怪奇物语），无法观看当地独家版权剧；本站评测报告中带有绿标实测截图的品牌均经过4K非自制剧播放实测。',
        },
      },
      {
        '@type': 'Question',
        name: '为什么在搜索框输入某个机场名称后显示“未找到结果”？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '机场pics对收录服务商设有严格的技术准入门槛。开业不足3个月、无独立运维群、存在严重虚标偷跑或黑产欺诈前科的机场不会被收录。若你关注的品牌尚未收录，可查阅下方42家经过审核的品牌总表寻找同价位替代方案。',
        },
      },
      {
        '@type': 'Question',
        name: '如何检索支持特定客户端（如 Clash Verge Rev、Shadowrocket）的教程？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '直接在搜索框输入客户端全称或简称（如“Clash”、“小火箭”、“Sing-box”），即可直达系统级的客户端下载、订阅转换、TUN虚拟网卡配置及分流规则实操指南，或点击导航栏“客户端教程”专区浏览。',
        },
      },
      {
        '@type': 'Question',
        name: '搜索结果中的实测数据和厂商档案有什么区别？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '标有“实测跑分”的品牌由本实验室部署在电信、联通、移动的物理探针在晚高峰时段（20:00-23:00）实测抓取了32线程满载测速图与解锁图；标有“厂商档案”的数据来自服务商官方技术工单与公开SLA承诺，并通过自动化探针进行了周期性连通性抽检。',
        },
      },
      {
        '@type': 'Question',
        name: '按量计费套餐和周期月付套餐在搜索时应如何权衡？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '低频出差、多设备备用或轻量查阅文档用户建议搜索“按量计费”或“不限时”，一次性购买长期有效，成本最低；若用于高频4K影音、企业外贸办公或大模型代码训练，建议搜索“IEPL专线月付”，保障高峰期独享带宽与低延迟。',
        },
      },
      {
        '@type': 'Question',
        name: '站内搜索是否依赖外部第三方后端？搜索记录会泄露隐私吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '本站搜索基于完全静态的开源引擎 Pagefind 实现，所有索引数据在站点构建时生成并缓存在浏览器本地 WebAssembly 中。你的所有搜索关键词完全在本地浏览器离线匹配计算，不向任何第三方服务器发送搜索查询记录，绝对保护隐私。',
        },
      },
      {
        '@type': 'Question',
        name: '发现评测中的优惠码或套餐价格过期了怎么办？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '机场服务商的套餐活动与优惠码存在时效性。本站每个工作日对 Top 10 核心品牌的价格与可用性进行巡检更新；若遇到失效，可在品牌评测页面点击官方直达链接，在结算页面查看官方最新的即时促销提示。',
        },
      },
      {
        '@type': 'Question',
        name: '为什么不同宽带运营商访问同一家机场的实测速度差异巨大？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '国内三大运营商与国际骨干网的互联互通架构不同。中国电信163骨干网晚高峰极度拥挤，必须依赖高质量BGP入口中转；中国联通出海互联较平稳；中国移动出海海缆资源庞大但在跨网互通存在延迟壁垒。优质机场通常采用多线BGP入口为不同运营商自动下发最优路由。',
        },
      },
      {
        '@type': 'Question',
        name: '搜索结果中提示的倍率（如 1.0x、0.2x、2.0x）是什么含义？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '倍率代表节点消耗套餐流量的扣费比例。1.0x代表下载1GB扣除1GB；0.2x低倍率节点下载1GB仅扣除0.2GB（适合大文件下载）；2.0x高倍率节点通常用于极低延迟物理专线或稀缺原生住宅IP，下载1GB扣除2GB。搜索时需结合倍率计算实际可用流量。',
        },
      },
    ],
  },
];
---

<BaseLayout title={title} description={description}>
  <StructuredData slot="head" schema={schema} />
  <link slot="head" rel="stylesheet" href={\`\${bundlePath}pagefind-ui.css\`} />

  <!-- 头部：权威检索引导与主搜索入口 -->
  <section class="page-head section">
    <p class="eyebrow">全网加速索引 / 知识库检索与全景决策中心</p>
    <h1>机场与网络加速知识库智能检索中心</h1>
    <p class="lead">
      欢迎使用 <strong>机场pics (jichangtuijian.pics)</strong> 独立加速资源检索系统。本中心基于完全静态离线索引引擎，全面收录了 42 家主流机场评测报告、IEPL/IPLC 跨境专线参数、Netflix/ChatGPT 原生解锁矩阵、全平台客户端安装调试指南及晚高峰排障手册。输入关键词即时检索，毫秒级响应，本地纯离线运算，绝不收集用户搜索记录。
    </p>

    <!-- 快捷热门检索词胶囊组 -->
    <div class="search-tags-box">
      <span class="tags-label">热门快捷检索：</span>
      <div class="tags-cloud">
        <button type="button" class="search-tag" data-kw="光速云">光速云 (Top1)</button>
        <button type="button" class="search-tag" data-kw="暮光加速">暮光加速</button>
        <button type="button" class="search-tag" data-kw="二猫云">二猫云</button>
        <button type="button" class="search-tag" data-kw="星岛梦">星岛梦 (按量)</button>
        <button type="button" class="search-tag" data-kw="IEPL专线">IEPL内网专线</button>
        <button type="button" class="search-tag" data-kw="ChatGPT">ChatGPT/AI解锁</button>
        <button type="button" class="search-tag" data-kw="Netflix">Netflix 4K</button>
        <button type="button" class="search-tag" data-kw="Clash">Clash Verge教程</button>
        <button type="button" class="search-tag" data-kw="Shadowrocket">小火箭iOS配置</button>
        <button type="button" class="search-tag" data-kw="按量计费">不限时按量</button>
        <button type="button" class="search-tag" data-kw="性价比">平价性价比</button>
      </div>
    </div>
  </section>

  <!-- 核心搜索交互区 -->
  <section class="section search-section" aria-label="站内全文即时搜索">
    <div id="search" data-bundle-path={bundlePath}>
      <p class="search-fallback">正在初始化智能索引引擎，请稍候...</p>
    </div>

    <script is:inline data-astro-rerun>
      (() => {
        const container = document.getElementById('search');
        if (!container) return;
        const bundlePath = container.dataset.bundlePath;

        const initSearch = () => {
          container.querySelector('.search-fallback')?.remove();
          if (!window.pagefindInstance) {
            window.pagefindInstance = new PagefindUI({
              element: '#search',
              bundlePath,
              showImages: false,
              showSubResults: true,
              autofocus: true,
              translations: {
                placeholder: '输入关键词检索 42 家机场评测、专线方案、流媒体解锁或客户端教程...',
                clear_search: '清空',
                load_more: '加载更多匹配结果',
                search_label: '站内检索',
                filters_label: '筛选维度',
                zero_results: '未找到包含 [SEARCH_TERM] 的直接结果。建议尝试精简关键词，或查阅下方 42 家品牌全要素速查表。',
                many_results: '共找到 [COUNT] 条与 [SEARCH_TERM] 相关的内容',
                one_result: '找到 1 条与 [SEARCH_TERM] 相关的内容',
                alt_search: '未找到 [SEARCH_TERM] 的完全匹配。已为您展示包含相关词组的结果：',
                search_suggestion: '您是否要搜索：[SEARCH_TERM]？',
                searching: '正在极速检索知识库...'
              }
            });
          }

          // 绑定快捷检索标签点击事件
          document.querySelectorAll('.search-tag').forEach((btn) => {
            btn.onclick = () => {
              const kw = btn.getAttribute('data-kw');
              const input = document.querySelector('.pagefind-ui__search-input');
              if (input) {
                input.value = kw;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.focus();
                // 平滑滚动到搜索框
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            };
          });
        };

        if (window.PagefindUI) {
          initSearch();
        } else {
          const script = document.createElement('script');
          script.src = \`\${bundlePath}pagefind-ui.js\`;
          script.onload = initSearch;
          document.head.append(script);
        }
      })();
    </script>
  </section>

  <!-- 模块一：无需搜索直接给答案 — 3 分钟需求速查决策分支 -->
  <section class="section" id="quick-pick">
    <div class="section-title">
      <span class="step-num">01</span>
      <h2>开头直接给答案：常见搜索意图与 3 分钟选型速查</h2>
    </div>
    <p class="section-desc">
      如果你不确定该输入什么关键词，可以直接根据你的核心使用场景对号入座，获取直接决策结论与精选候选方案：
    </p>

    <div class="card-grid">
      <div class="summary-box">
        <h3>跨国企业办公 / 外贸沟通 / 代码托管加速</h3>
        <p><strong>核心检索关键词：</strong><code>IEPL专线</code>、<code>BGP多线入口</code>、<code>原生双栈</code>、<code>稳定不掉线</code></p>
        <p><strong>选型硬性条件：</strong>必须具备跨境物理专线，拒绝普通公网直连；晚高峰（20:00-23:00）丢包率必须低于 0.5%，保证 SSH 与 Git 操作长连接永续。</p>
        <p class="badge-row"><span class="badge blue">首选推荐：光速云</span><span class="badge">企业备选：大佬云</span></p>
        <a class="button action-btn" href="/works/guangsu/">查阅光速云企业实测 &rarr;</a>
      </div>

      <div class="summary-box">
        <h3>学术科研 / AI大模型开发 / 深度学习调优</h3>
        <p><strong>核心检索关键词：</strong><code>ChatGPT解锁</code>、<code>Claude原生</code>、<code>非香港节点</code>、<code>美国住宅IP</code></p>
        <p><strong>选型硬性条件：</strong>必须避开中国香港节点直连，优选新加坡、日本或美国原生节点；IP 必须未被 OpenAI / Anthropic 列入机房风险黑名单。</p>
        <p class="badge-row"><span class="badge blue">首选推荐：光速云 (配AI专线)</span><span class="badge">高性价比：二猫云</span></p>
        <a class="button action-btn" href="/works/ermao/">查阅二猫云原生解锁实测 &rarr;</a>
      </div>

      <div class="summary-box">
        <h3>4K/8K 极致影音 / 国际流媒体重度追剧</h3>
        <p><strong>核心检索关键词：</strong><code>Netflix原生</code>、<code>Disney+</code>、<code>YouTube 4K</code>、<code>大冗余带宽</code></p>
        <p><strong>选型硬性条件：</strong>要求具备解锁非自制剧能力；单线程突发带宽不低于 50Mbps，晚高峰具备充足冗余中转带宽，起播缓冲时间小于 800 毫秒。</p>
        <p class="badge-row"><span class="badge blue">首选推荐：暮光加速</span><span class="badge">平价备选：飞猫云</span></p>
        <a class="button action-btn" href="/works/muguang/">查阅暮光加速影音实测 &rarr;</a>
      </div>

      <div class="summary-box">
        <h3>多设备出差 / 低频备用 / 预算极度敏感</h3>
        <p><strong>核心检索关键词：</strong><code>按量计费</code>、<code>不限时套餐</code>、<code>平价月付</code>、<code>轻量应急</code></p>
        <p><strong>选型硬性条件：</strong>没有固定月租或到期清零压力，一次购买长期有效；或者月付门槛在 10 元左右，支持月付续费。</p>
        <p class="badge-row"><span class="badge blue">不限时首选：星岛梦</span><span class="badge">平价月付：微风网络</span></p>
        <a class="button action-btn" href="/works/xingdaomeng/">查阅星岛梦按量评测 &rarr;</a>
      </div>
    </div>
  </section>

  <!-- 模块二：42 家机场品牌全要素可检索数据库总表（有依据的核心对比表） -->
  <section class="section" id="all-brands-index">
    <div class="section-title">
      <span class="step-num">02</span>
      <h2>42 家机场品牌全要素可检索数据库总表</h2>
    </div>
    <p class="section-desc">
      无需手动搜索，以下表格收录了本站知识库当前跟踪的全部 42 家机场品牌技术参数。统一按照梯队排名、物理线路架构、主流通信协议、真实起步费用、晚高峰实测状态及核验时间排列。在手机端可横向平滑滚动查看全量细节：
    </p>

    <div class="table-container">
      <table class="observatory-table">
        <thead>
          <tr>
            <th>梯队排名</th>
            <th>品牌名称</th>
            <th>线路架构</th>
            <th>核心协议</th>
            <th>起步价格与套餐形式</th>
            <th>实测状态</th>
            <th>最后核验日期</th>
            <th>深度评测入口</th>
          </tr>
        </thead>
        <tbody>
          ${brandsTableRows}
        </tbody>
      </table>
    </div>
    <div class="note-box">
      <strong>数据统计说明与防伪准则：</strong>上述表格标有 🟢 的品牌代表由本实验室物理探针在晚高峰时段直接抓取了 32 线程真实测速与流媒体解锁截图；标有 🔵 的品牌数据采信自服务商官方技术工单与公开 SLA 承诺，并通过自动化探针周期抽检。若发现价格或节点变更，可在各单篇评测页面查阅官方最新即时状态。
    </div>
  </section>

  <!-- 模块三：42 家机场多维搜索意图与全量技术画像解析长卷（专著级深度扩展） -->
  <section class="section" id="brands-deep-profiles">
    <div class="section-title">
      <span class="step-num">03</span>
      <h2>42 家机场全维度搜索画像与技术档案专著长卷</h2>
    </div>
    <p class="section-desc">
      为了满足技术开发者、学术科研人员与重度用户的深层次检索需求，本板块详细展开了 42 家品牌的具体网络拓扑、支持协议、晚高峰抗压特性与专属优缺点，供你在搜索定位时进行全面核验：
    </p>

    <div class="brand-profiles-container">
      ${brandProfilesHtml}
    </div>
  </section>

  <!-- 模块四：底层网络技术 9 大核心搜索词深度拆解与鉴别表 -->
  <section class="section" id="terms-matrix">
    <div class="section-title">
      <span class="step-num">04</span>
      <h2>底层网络技术 9 大核心搜索词深度拆解与鉴别</h2>
    </div>
    <p class="section-desc">
      在网络加速领域，大量商家利用信息不对称堆砌概念。以下系统拆解 9 大最核心底层技术术语的物理本质与搜索鉴别标准：
    </p>

    <div class="table-container">
      <table class="observatory-table">
        <thead>
          <tr>
            <th>核心搜索关键词</th>
            <th>物理链路本质与过境特征</th>
            <th>主要适用群体</th>
            <th>晚高峰抗丢包表现</th>
            <th>搜索真伪鉴别方法</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>IEPL 内网专线</strong></td>
            <td>国际物理以太网私有专线，走跨境光纤点对点内网，不过公网海缆网关</td>
            <td>跨国企业办公、外贸客服、代码仓库拉取、高频金融量化</td>
            <td><strong>极强 (丢包率常年 &lt; 0.5%)</strong></td>
            <td>全天 Ping 延迟波动差值 &le; 2ms；MTR 追踪无公网 202.97 骨干跃点</td>
          </tr>
          <tr>
            <td><strong>IPLC 专线</strong></td>
            <td>国际点对点专用电路，传统电信级点对点物理通道</td>
            <td>重度跨国数据同步、超低抖动即时通信</td>
            <td><strong>极强 (近乎零抖动)</strong></td>
            <td>延迟极度平滑，成本极高，通常价格在 20 元/月以上</td>
          </tr>
          <tr>
            <td><strong>BGP 隧道中转</strong></td>
            <td>国内多线 BGP 机房接收入口，通过公网加密隧道中转至境外落地</td>
            <td>4K 影音、大流量下载、多设备日常冲浪</td>
            <td><strong>良好 (视中转带宽冗余度而定)</strong></td>
            <td>高峰期偶有 1%-3% 丢包，但性价比极高，单价低廉</td>
          </tr>
          <tr>
            <td><strong>CN2 GIA (AS4809)</strong></td>
            <td>中国电信新一代海外精品网，具备最高传输 QoS 优先级</td>
            <td>电信宽带直连出海用户、自建 VPS 开发者</td>
            <td><strong>优良</strong></td>
            <td>抓包路由必经 59.43 开头的电信精品节点 IP</td>
          </tr>
          <tr>
            <td><strong>9929 精品 A 网</strong></td>
            <td>中国联通海外工业互联专用骨干网，负载率远低于普通 4837</td>
            <td>联通高品质用户、欧洲/日本出海方向</td>
            <td><strong>优良 (延迟极低)</strong></td>
            <td>路由经过 218.105 或 210.13 联通 A 网网关</td>
          </tr>
          <tr>
            <td><strong>CMI (AS58453)</strong></td>
            <td>中国移动国际海缆网络，移动直达香港和东南亚的大动脉</td>
            <td>中国移动宽带用户、香港低延迟重度依赖者</td>
            <td><strong>在香港方向极佳</strong></td>
            <td>移动用户直连延迟可低至 10-20ms；但若骨干网跨网互联可能抖动</td>
          </tr>
          <tr>
            <td><strong>原生双栈 IPv6</strong></td>
            <td>落地机房同时分配原生真实 IPv4 与 IPv6 公网地址</td>
            <td>学术科研教育网用户、大屏智能电视流媒体解锁</td>
            <td>取决于底层过境线路</td>
            <td>在 IPv6 探测网站可直接识别到归属地真实的 ASN 机构名称</td>
          </tr>
          <tr>
            <td><strong>家宽住宅 IP (Residential)</strong></td>
            <td>由当地民用宽带运营商（如 AT&T, Comcast, HKT）分配给家庭用户的 IP</td>
            <td>OpenAI ChatGPT、Claude、TikTok 达人店铺防封控运营</td>
            <td>普通 (住宅宽带上行有限)</td>
            <td>IPinfo.io 显示 Type 为 <code>isp</code> 而非 <code>hosting</code></td>
          </tr>
          <tr>
            <td><strong>动态 BGP 智能入口</strong></td>
            <td>国内入口部署 Anycast 或 DNS 智能解析，自动匹配电信/联通/移动最优中转</td>
            <td>全国跨省多设备家庭、多运营商混合网络</td>
            <td><strong>极佳 (规避跨网劣化)</strong></td>
            <td>不同运营商宽带解析出的入口 IP 位于本地省份或最近骨干枢纽</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 模块五：系统专栏指南与客户端检索地图 -->
  <section class="section" id="guides-index">
    <div class="section-title">
      <span class="step-num">05</span>
      <h2>系统专栏指南与全平台客户端检索索引</h2>
    </div>
    <p class="section-desc">
      除了具体的机场品牌评测，本站还沉淀了大量底层网络架构科普、全平台客户端安装调试及避坑防雷指南。你可以直接通过以下专题索引进行定向阅读：
    </p>

    <div class="card-grid">
      <div class="guide-card">
        <h4>底层网络架构与选型科普</h4>
        <ul>
          <li><a href="/blog/iepl-vs-iplc-guide/"><strong>IEPL vs IPLC 专线深度解析：</strong>两种跨境专线的物理光纤差异与选型避坑</a></li>
          <li><a href="/blog/airport-vs-self-built-vps/"><strong>买现成机场还是自己租 VPS 搭建？</strong>从 IP 封锁、抗丢包到运维成本全方位对比</a></li>
          <li><a href="/blog/budget-airport-buying-guide/"><strong>平价低价机场选购避坑指南：</strong>如何识别 5 元月付超售与跑路陷阱</a></li>
          <li><a href="/about/"><strong>网络可观测实验室测速准则：</strong>多运营商晚高峰实测方法学与 E-E-A-T 规范白皮书</a></li>
        </ul>
      </div>

      <div class="guide-card">
        <h4>流媒体与 AI 工具专项实测</h4>
        <ul>
          <li><a href="/blog/netflix-chatgpt-unlock-guide/"><strong>Netflix / ChatGPT / Claude 解锁全景指南：</strong>非自制剧与原生住宅 IP 鉴别</a></li>
          <li><a href="/works/guangsu/"><strong>光速云全场景原生解锁实测：</strong>港日新美欧 32 节点 AI 兼容性测试报告</a></li>
          <li><a href="/works/muguang/"><strong>暮光加速 4K 影音体验评测：</strong>晚高峰超高清串流与节点抖动审计</a></li>
        </ul>
      </div>

      <div class="guide-card">
        <h4>全平台客户端配置与实操手册</h4>
        <ul>
          <li><a href="/blog/clash-verge-rev-complete-tutorial/"><strong>Clash Verge Rev 完整实操教程：</strong>Windows/macOS 双平台 TUN 模式与分流</a></li>
          <li><a href="/blog/shadowrocket-ios-setup-guide/"><strong>Shadowrocket (小火箭) iOS 深度配置：</strong>节点导入、分流规则与省电技巧</a></li>
          <li><a href="/clients/"><strong>全平台客户端下载汇总导航：</strong>Windows、macOS、iOS、Android、Linux 客户端直达</a></li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 模块六：科学检索方法学与关键词高级匹配技巧 -->
  <section class="section" id="search-methodology">
    <div class="section-title">
      <span class="step-num">06</span>
      <h2>科学网络检索方法学与关键词高级匹配技巧</h2>
    </div>
    <p>
      在海量网络技术资料中，输入精准的关键词能够帮助你以最快速度过滤掉 90% 的低质无效信息。本站 Pagefind 引擎支持多词组合与模糊子串匹配。掌握以下检索技巧，能够大幅提升决策效率：
    </p>

    <h3>1. 按宽带运营商进行匹配检索</h3>
    <p>
      不同国内宽带运营商的出海骨干网架构差异巨大，同一家机场在不同网络环境下的体验截然不同：
    </p>
    <ul>
      <li><strong>中国电信 (China Telecom)：</strong>普通 163 骨干网（AS4134）晚高峰出海拥塞极其严重。电信用户应重点检索 <code>IEPL专线</code>、<code>BGP中转</code> 或 <code>CN2 GIA</code>，避免检索公网直连节点。</li>
      <li><strong>中国联通 (China Unicom)：</strong>联通 4837 骨干网出海带宽相对充裕，对日本、欧洲方向互联优良。联通用户可检索 <code>9929精品网</code>、<code>BGP隧道</code> 或 <code>4837中转</code>，往往能以较低预算获得极佳体验。</li>
      <li><strong>中国移动 (China Mobile)：</strong>移动拥有庞大的 CMI（AS58453）国际海缆资源，连接中国香港、新加坡具有天然物理优势。移动用户可重点检索 <code>CMI直连</code>、<code>移动优化</code> 或 <code>香港专线</code>。</li>
    </ul>

    <h3>2. 避开虚假营销的“诱饵关键词”</h3>
    <p>
      在搜索引擎或社交媒体上搜索网络加速方案时，请高度警惕以下几类典型的黑产与欺诈诱饵词：
    </p>
    <div class="table-container">
      <table class="observatory-table">
        <thead>
          <tr>
            <th>高危诱饵词</th>
            <th>表面宣传承诺</th>
            <th>底层真实技术现状与跑路风险</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>“永久免费 / 破解版客户端”</strong></td>
            <td>宣称永久无需付费，无限制使用高速专线。</td>
            <td><strong>极度危险。</strong>通常在安装包中植入挖矿木马、键盘记录器或恶意抓包证书，窃取用户网银、社交账号及隐私数据。</td>
          </tr>
          <tr>
            <td><strong>“5元一年 / 10元永久不限流量”</strong></td>
            <td>一次性极低价格，宣称永远不限速不限量。</td>
            <td><strong>经典庞氏跑路模型。</strong>物理专线每 Mbps 月租高达数十元，此类商家仅靠新用户的资金拆东墙补西墙，3-6个月内必然关网卷款跑路。</td>
          </tr>
          <tr>
            <td><strong>“直连美国延迟低至10ms”</strong></td>
            <td>声称突破物理光速极限，全网最低延迟。</td>
            <td><strong>前端作弊虚标。</strong>光在玻璃光纤中的传播速度有限，中美物理光缆理论极限往返时延在 100ms 以上，宣称 10ms 仅是本地到国内入口的内网 Ping。</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 模块七：全球主要 POP 落地节点特性检索指南 -->
  <section class="section" id="pop-nodes">
    <div class="section-title">
      <span class="step-num">07</span>
      <h2>全球主要 POP 落地节点特性与检索指南</h2>
    </div>
    <p>
      在站内搜索特定国家或地区的节点时，了解各地区的物理网络特征，有助于你根据实际任务选择最合适的落地：
    </p>

    <div class="topology-grid">
      <div class="topo-card">
        <h3>中国香港 (Hong Kong) POP 节点</h3>
        <p><strong>物理延迟：</strong>华南地区仅 4-15ms，华东/华北约 25-35ms。</p>
        <p><strong>核心优势：</strong>距离大陆最近，国内直连互联质量最高，网页秒开，极其适合日常网页浏览、外贸客服与代码仓库拉取。</p>
        <p><strong>主要限制：</strong><strong>OpenAI ChatGPT 官方不支持香港地区</strong>；部分流媒体对香港 IP 审查极其严苛。检索时建议搭配“分流规则”使用。</p>
      </div>

      <div class="topo-card">
        <h3>日本 (Japan) POP 节点</h3>
        <p><strong>物理延迟：</strong>华东沿海（上海/青岛）仅 25-35ms，全国平均 45-65ms。</p>
        <p><strong>核心优势：</strong>接入 NTT、IIJ、SoftBank 顶级骨干网；完全支持 OpenAI ChatGPT、Claude 及 Google Gemini；原生解锁 ABEMA、DMM、Netflix 日区等独家版权动漫。</p>
        <p><strong>主要限制：</strong>个别小众机房在晚高峰存在对特定国内省份的互联抖动，首选配置了专线内网中转的日本节点。</p>
      </div>

      <div class="topo-card">
        <h3>新加坡 (Singapore) POP 节点</h3>
        <p><strong>物理延迟：</strong>华南移动/电信约 38-55ms，华北地区约 65-80ms。</p>
        <p><strong>核心优势：</strong>东南亚顶级网络交换枢纽，TikTok 官方业务出海首选；全面支持主流 AI 平台；中文内容生态友好，Google 搜索默认简繁中文。</p>
        <p><strong>主要限制：</strong>国际带宽价格较高，部分平价机场会在此地区进行轻度倍率加成（如 1.2x 或 1.5x）。</p>
      </div>

      <div class="topo-card">
        <h3>美国西海岸 (US West) POP 节点</h3>
        <p><strong>物理延迟：</strong>中美物理海缆极致往返时延在 125-155ms 之间。</p>
        <p><strong>核心优势：</strong>全球互联网核心心脏，IP 资源极其充裕；各大 AI 平台（OpenAI、Claude、Midjourney）、开发者工具（AWS、Cloudflare、Docker）原生支持最好。</p>
        <p><strong>主要限制：</strong>受限于地球曲率物理距离，无法胜任实时竞技类联机游戏（延迟高于 120ms），主要用于大吞吐下载与 AI 生产力。</p>
      </div>
    </div>
  </section>

  <!-- 模块八：10 大站内搜索与网络加速选型核心 FAQ -->
  <section class="section" id="faq">
    <div class="section-title">
      <span class="step-num">08</span>
      <h2>10 大高频站内搜索与网络加速选型常见问题 (FAQ)</h2>
    </div>

    <div class="faq-accordion">
      <details class="faq-item" open>
        <summary class="faq-question">如何在站内快速检索适合自己宽带运营商的机场？</summary>
        <div class="faq-answer">
          <p>
            <strong>电信用户：</strong>推荐在搜索框输入“电信”或“IEPL专线”，优先选用具备华东/华南优质 BGP 入口的高品质专线，能彻底避开晚高峰 163 骨干网的拥堵丢包。<br />
            <strong>联通用户：</strong>可检索“9929”或“BGP中转”，联通自身出海质量较好，配合优质中转即可跑满千兆带宽。<br />
            <strong>移动用户：</strong>检索“CMI”或“移动直连”，在香港和新加坡方向具有极低延迟和超高带宽吞吐。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">搜索特定流媒体（如 Netflix / Disney+）解锁时需要注意什么？</summary>
        <div class="faq-answer">
          <p>
            必须确认评测中是否标明“非自制剧全解锁”与“原生双栈 IP”。很多机场宣称的“支持 Netflix”其实只能观看全球自制剧（Netflix Originals），无法观看《绝命毒师》等独家版权剧。本站标有 🟢 实测绿标的品牌（如光速云、暮光加速、二猫云）均通过了 4K 非自制剧的原生播放实测。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">为什么在搜索框输入某个机场名称后显示“未找到结果”？</summary>
        <div class="faq-answer">
          <p>
            机场pics对收录服务商设有严格的技术准入门槛。开业不足 3 个月、无公开社群、存在严重虚标偷跑或有黑产跑路前科的品牌均不会被收录。如果你搜索的品牌未被收录，建议直接在上方 42 家精选矩阵表中寻找同价位、同线路等级的优质替代品牌。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">如何检索支持特定客户端（如 Clash Verge Rev、Shadowrocket）的教程？</summary>
        <div class="faq-answer">
          <p>
            直接在搜索框输入客户端全称或简称（如“Clash”、“小火箭”、“Sing-box”），即可直达系统级的客户端下载、订阅转换、TUN 虚拟网卡配置及分流规则实操指南，或点击上方“专栏指南”中的客户端专题快速查阅。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">搜索结果中的实测数据和厂商档案有什么区别？</summary>
        <div class="faq-answer">
          <p>
            标有“实测跑分”的品牌由本实验室部署在电信、联通、移动的物理探针在晚高峰时段（20:00-23:00）实测抓取了 32 线程满载测速图与解锁图；标有“厂商档案”的数据来自服务商官方技术工单与公开 SLA 承诺，并通过自动化探针进行了周期性连通性抽检。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">按量计费套餐和周期月付套餐在搜索时应如何权衡？</summary>
        <div class="faq-answer">
          <p>
            低频出差、多设备备用或轻量查阅文档用户建议搜索“按量计费”或“不限时”（如星岛梦），一次性购买长期有效，成本最低；若用于高频 4K 影音、企业外贸办公或大模型代码训练，建议搜索“IEPL专线月付”（如光速云、暮光加速），保障高峰期独享带宽与低延迟。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">站内搜索是否依赖外部第三方后端？搜索记录会泄露隐私吗？</summary>
        <div class="faq-answer">
          <p>
            本站搜索基于完全静态的开源引擎 Pagefind 实现，所有索引数据在站点构建时生成并缓存在浏览器本地 WebAssembly 中。你的所有搜索关键词完全在本地浏览器离线匹配计算，不向任何第三方服务器发送搜索查询记录，绝对保护隐私。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">发现评测中的优惠码或套餐价格过期了怎么办？</summary>
        <div class="faq-answer">
          <p>
            机场服务商的套餐活动与优惠码存在时效性。本站每个工作日对 Top 10 核心品牌的价格与可用性进行巡检更新；若遇到失效，可在品牌评测页面点击官方直达链接，在结算页面查看官方最新的即时促销提示。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">为什么不同宽带运营商访问同一家机场的实测速度差异巨大？</summary>
        <div class="faq-answer">
          <p>
            国内三大运营商与国际骨干网的互联互通架构不同。中国电信 163 骨干网晚高峰极度拥挤，必须依赖高质量 BGP 入口中转；中国联通出海互联较平稳；中国移动出海海缆资源庞大但在跨网互通存在延迟壁垒。优质机场通常采用多线 BGP 入口为不同运营商自动下发最优路由。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">搜索结果中提示的倍率（如 1.0x、0.2x、2.0x）是什么含义？</summary>
        <div class="faq-answer">
          <p>
            倍率代表节点消耗套餐流量的扣费比例。1.0x 代表下载 1GB 扣除 1GB；0.2x 低倍率节点下载 1GB 仅扣除 0.2GB（适合大文件下载）；2.0x 高倍率节点通常用于极低延迟物理专线或稀缺原生住宅 IP，下载 1GB 扣除 2GB。搜索时需结合倍率计算实际可用流量。
          </p>
        </div>
      </details>
    </div>
  </section>

  <!-- 底部行动倡议卡片与内链枢纽 -->
  <section class="section">
    <div class="summary-box" style="text-align: center; padding: 2.5rem 1.5rem;">
      <h3>尚未找到满意的网络加速方案？</h3>
      <p style="max-width: 680px; margin: 0 auto 1.5rem;">
        除了通过关键词搜索，你还可以直接浏览我们的编辑精选推荐、42 家品牌按标签多维筛选库，或查阅实验室严苛的晚高峰测速准则。
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a class="button action-btn" href="/works/">浏览编辑精选评测 &rarr;</a>
        <a class="button action-btn" href="/brands/">前往42家品牌标签筛选库 &rarr;</a>
        <a class="button action-btn" href="/about/">查阅实验室测速准则白皮书 &rarr;</a>
        <a class="button action-btn" href="/clients/">下载全平台客户端指南 &rarr;</a>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .page-head {
    padding-top: calc(var(--baseline) * 2);
    padding-bottom: calc(var(--baseline) * 2);
    border-bottom: 1px solid var(--color-border);
  }

  .search-tags-box {
    margin-top: 1.5rem;
    padding: 0.85rem 1.15rem;
    background: var(--color-surface, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--color-border);
    border-radius: 6px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }

  .tags-label {
    font-size: 0.88rem;
    font-weight: 650;
    color: var(--color-fg);
  }

  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .search-tag {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    color: var(--color-muted);
    padding: 0.25rem 0.65rem;
    border-radius: 4px;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .search-tag:hover {
    color: var(--color-fg);
    border-color: var(--color-fg);
    background: var(--color-surface, rgba(0,0,0,0.04));
  }

  .search-section {
    padding-top: calc(var(--baseline) * 1.5);
    padding-bottom: calc(var(--baseline) * 2);
    border-bottom: 1px solid var(--color-border);
  }

  /* Pagefind UI 样式定制融入主题 */
  :global(.pagefind-ui) {
    --pagefind-ui-scale: 1;
    --pagefind-ui-primary: var(--color-fg);
    --pagefind-ui-text: var(--color-fg);
    --pagefind-ui-background: var(--color-bg);
    --pagefind-ui-border: var(--color-border);
    --pagefind-ui-tag: var(--color-border);
    --pagefind-ui-border-width: 1px;
    --pagefind-ui-border-radius: 6px;
    --pagefind-ui-font: inherit;
  }

  :global(.pagefind-ui__search-input) {
    font-size: 1.1rem !important;
    padding: 0.85rem 1.25rem 0.85rem 3rem !important;
    border: 1px solid var(--color-border) !important;
    background: var(--color-bg) !important;
    color: var(--color-fg) !important;
    border-radius: 6px !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
  }

  :global(.pagefind-ui__search-input:focus) {
    border-color: var(--color-fg) !important;
    outline: none !important;
  }

  :global(.pagefind-ui__result) {
    border-bottom: 1px solid var(--color-border) !important;
    padding: 1.25rem 0 !important;
  }

  :global(.pagefind-ui__result-link) {
    font-size: 1.25rem !important;
    font-weight: 650 !important;
    color: var(--color-fg) !important;
    text-decoration: underline !important;
  }

  :global(.pagefind-ui__result-excerpt) {
    font-size: 0.95rem !important;
    color: var(--color-muted) !important;
    line-height: 1.7 !important;
    margin-top: 0.4rem !important;
  }

  .section-title {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
  }

  .step-num {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-accent, #c95135);
  }

  .section-title h2 {
    margin-bottom: 0;
  }

  .section-desc {
    color: var(--color-muted);
    margin-bottom: 1.5rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .summary-box, .guide-card, .topo-card {
    background: var(--color-surface, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .summary-box h3, .guide-card h4, .topo-card h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--color-fg);
  }

  .badge-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0.75rem 0;
  }

  .badge {
    font-size: 0.78rem;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    background: var(--color-border);
    color: var(--color-fg);
  }

  .badge.blue {
    background: rgba(30, 110, 230, 0.12);
    color: #1a62cc;
    font-weight: 600;
    border: 1px solid rgba(30, 110, 230, 0.25);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    color: #ffffff !important;
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: var(--color-fg);
    transition: opacity 0.2s ease;
  }

  .action-btn:hover {
    opacity: 0.88;
  }

  .promo-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    color: var(--color-accent, #c95135) !important;
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: transparent;
    border: 1px solid var(--color-accent, #c95135);
    transition: all 0.2s ease;
  }

  .promo-btn:hover {
    background: var(--color-accent, #c95135);
    color: #ffffff !important;
  }

  .table-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 1.5rem 0;
    border: 1px solid var(--color-border);
    border-radius: 6px;
  }

  .observatory-table {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    font-size: 0.92rem;
    text-align: left;
  }

  .observatory-table th {
    background: var(--color-surface, rgba(0, 0, 0, 0.04));
    padding: 0.85rem 1rem;
    font-weight: 650;
    border-bottom: 1px solid var(--color-border);
    white-space: nowrap;
  }

  .observatory-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  .observatory-table tr:last-child td {
    border-bottom: none;
  }

  .observatory-table tr:nth-child(even) {
    background: rgba(0, 0, 0, 0.015);
  }

  .tag-status {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.78rem;
    font-weight: 650;
  }

  .tag-status.measured {
    background: rgba(16, 149, 193, 0.12);
    color: #0b7285;
    border: 1px solid rgba(16, 149, 193, 0.3);
  }

  .tag-status.vendor {
    background: rgba(100, 110, 120, 0.1);
    color: #495057;
    border: 1px solid rgba(100, 110, 120, 0.25);
  }

  .table-link {
    color: var(--color-accent, #c95135);
    font-weight: 600;
    text-decoration: underline;
  }

  .note-box {
    margin-top: 1rem;
    padding: 1rem 1.25rem;
    background: var(--color-surface, rgba(0, 0, 0, 0.02));
    border-left: 4px solid var(--color-accent, #c95135);
    font-size: 0.88rem;
    line-height: 1.7;
    color: var(--color-muted);
  }

  .topology-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .brand-profiles-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .brand-profile-card {
    background: var(--color-surface, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1.5rem;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .profile-title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .rank-badge {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    background: var(--color-accent, #c95135);
    color: #ffffff;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  .profile-title-group h3 {
    margin: 0;
    font-size: 1.3rem;
  }

  .profile-line-type {
    font-size: 0.88rem;
    color: var(--color-muted);
    font-weight: 600;
  }

  .profile-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    padding: 0.85rem 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    font-size: 0.88rem;
  }

  .meta-label {
    color: var(--color-muted);
  }

  .meta-val {
    font-weight: 600;
    color: var(--color-fg);
  }

  .profile-summary {
    font-size: 0.92rem;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .profile-features {
    font-size: 0.88rem;
    margin-bottom: 1.25rem;
  }

  .features-label {
    font-weight: 650;
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-fg);
  }

  .profile-features ul {
    margin: 0;
    padding-left: 1.25rem;
    line-height: 1.7;
    color: var(--color-muted);
  }

  .profile-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .faq-item {
    background: var(--color-surface, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--color-border);
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }

  .faq-item[open] {
    border-color: var(--color-fg);
  }

  .faq-question {
    padding: 1rem 1.25rem;
    font-weight: 600;
    font-size: 1.05rem;
    cursor: pointer;
    background: var(--color-surface, rgba(0, 0, 0, 0.03));
    user-select: none;
    outline: none;
  }

  .faq-question:hover {
    color: var(--color-accent, #c95135);
  }

  .faq-answer {
    padding: 1rem 1.25rem;
    font-size: 0.95rem;
    line-height: 1.75;
    border-top: 1px solid var(--color-border);
  }

  .faq-answer p {
    margin: 0;
  }

  @media (max-width: 640px) {
    .section-title {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
</style>
`;

fs.writeFileSync(searchPath, content, 'utf8');
console.log('Successfully written expanded search page to', searchPath);
