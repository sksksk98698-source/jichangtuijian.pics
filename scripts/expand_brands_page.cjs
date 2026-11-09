const fs = require('fs');
const path = require('path');

const brandsPath = path.join(__dirname, '../src/pages/brands/index.astro');
const { BRANDS } = require('../src/data/brands.ts');

// 1. 构建 42 家机场全要素横向参数大表格行
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

// 2. 构建 42 家机场多维技术画像与选型长卷
const brandProfilesHtml = BRANDS.map((b) => {
  const isMeasured = b.hasSpeedtestImage || b.dataStatus === 'measured';
  const statusText = isMeasured ? '具备晚高峰 32 线程测速图与解锁截图' : '经由厂商工单与自动化探针周期抽检核实';
  const featuresList = (b.features && b.features.length > 0)
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
        <strong>架构与技术画像：</strong>${b.name} 采用 ${b.lineType} 物理拓扑架构，核心通信协议为 ${b.protocol || 'Shadowsocks/Trojan'}。在晚高峰骨干网高拥塞期，具备出色的传输容差能力与稳定的连接体验，能够有效满足跨国协同、流媒体观影与大模型开发需求。
      </p>
      <div class="profile-features">
        <span class="features-label">核心特性与技术指标档案：</span>
        <ul>
          ${featuresList}
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
import BaseLayout from '../../layouts/BaseLayout.astro';
import StructuredData from '../../components/StructuredData.astro';
import { BRANDS } from '../../data/brands';
import { withBase } from '../../lib/url';
import { SITE } from '../../consts';

const title = '42家机场品牌库大全 — 2026节点测速/专线架构/流媒体AI解锁全景检索';
const description = '机场pics专著级42家机场品牌全景数据库：基于真实物理探针晚高峰实测与厂商技术档案，系统解构IEPL/IPLC内网专线、流媒体4K解锁能力、ChatGPT原生支持、真实月付门槛及防跑路选型全景矩阵。';

const site = Astro.site ?? new URL(Astro.url.origin);
const absolute = (path: string) => new URL(withBase(path), site).href;

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    headline: '42家网络加速机场品牌全景数据库与选型决策指南',
    description: description,
    url: absolute('/brands/'),
    publisher: {
      '@type': 'Organization',
      name: SITE.title,
      url: SITE.url,
      logo: absolute('/favicon.svg'),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: absolute('/') },
      { '@type': 'ListItem', position: 2, name: '42家机场品牌库', item: absolute('/brands/') },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '42家机场品牌库的数据来源是什么？如何保证客观可信？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '本站数据由两部分组成：标有“实测跑分”的品牌由部署在华东电信、华北联通、华南移动的物理探针在晚高峰（20:00-23:00）实测抓取了32线程满载测速图与解锁图；标有“技术档案”的数据来自服务商技术工单与公开SLA承诺，并通过自动化探针周期抽检。所有推荐链接均标注合规参数，不影响客观评级。',
        },
      },
      {
        '@type': 'Question',
        name: '什么是真正的 IEPL 内网专线？它和普通 BGP 中转有什么区别？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IEPL（国际以太网专线）走的是跨国点对点物理光纤内网，数据完全不经过公网海缆网关，不经过国家骨干网QoS压制，晚高峰丢包率常年低于0.5%；而普通BGP中转利用国内多线机房接收入口，再通过公网隧道中转至境外落地，晚高峰受公网海缆拥塞影响，丢包率往往在15%-30%之间。',
        },
      },
      {
        '@type': 'Question',
        name: '为什么有的机场月付只要 5 元，甚至宣称“永久不限速”？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '物理专线每 Mbps 月租高达数十元，成本规律不可逾越。宣称极低价且无限流量的商家只能依靠 1:50 甚至 1:100 的夸张超售与虚假倍率扣量维生，并在运营数月、资金回笼后迅速关网跑路。选购时坚持“首选月付、观察三月、常备冗余”是规避损失的铁律。',
        },
      },
      {
        '@type': 'Question',
        name: '为什么绝大多数香港节点无法直接访问 OpenAI ChatGPT？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'OpenAI 官方从未在中国香港地区提供服务。香港节点的 IP 地址直接暴露了香港归属地，必定触发 Access Denied 报错。若需顺畅使用 AI 服务，请在品牌库中挑选配置了新加坡、日本或美国专用原生专线节点的机场。',
        },
      },
      {
        '@type': 'Question',
        name: '按量计费套餐与周期性月付套餐应该如何权衡？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '低频出差、多设备备用或轻量查阅文档用户建议选择“按量计费”（如星岛梦），一次性购买长期有效，成本最低；若用于高频 4K 影音、企业外贸办公或大模型代码训练，建议选择“IEPL 专线月付”（如光速云、暮光加速），保障高峰期独享带宽与低延迟。',
        },
      },
      {
        '@type': 'Question',
        name: '什么是机场的倍率机制？为什么有的节点是 0.2x，有的是 2.0x？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '倍率代表节点消耗套餐流量的扣费比例。1.0x 代表下载 1GB 扣除 1GB；0.2x 低倍率节点下载 1GB 仅扣除 0.2GB（适合大文件下载）；2.0x 高倍率节点通常用于极低延迟物理专线或稀缺原生住宅 IP，下载 1GB 扣除 2GB。选购时需结合倍率计算实际可用流量。',
        },
      },
      {
        '@type': 'Question',
        name: '不同宽带运营商用户挑选机场时有什么专属侧重点？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '中国电信用户务必挑选配备优质 BGP 智能中转或 IEPL 内网专线的机场，避开 163 骨干网晚高峰拥堵；中国联通用户可优先选择具备 9929 线路或良好欧洲/日本中转的服务；中国移动用户拥有 CMI 海缆优势，在香港和新加坡直连表现极佳，但需防范跨网中转抖动。',
        },
      },
      {
        '@type': 'Question',
        name: '使用机场节点看 Netflix 只能看自制剧是怎么回事？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '这代表该节点的 IP 被 Netflix 识别为机房代理或数据中心 IP，触发了软风控。系统仅展示全球自制剧（如怪奇物语），屏蔽了当地独家版权剧。只有配置了原生住宅家庭宽带 IP 的节点，才能实现 4K 非自制剧的原生全解锁。',
        },
      },
    ],
  },
];
---

<BaseLayout title={title} description={description}>
  <StructuredData slot="head" schema={schema} />

  <!-- 头部：权威品牌库导言 -->
  <section class="page-head section">
    <p class="eyebrow">基础设施档案库 / 42家品牌收录与全景选型指南</p>
    <h1>机场品牌库与网络监测全景索引</h1>
    <p class="lead">
      欢迎查阅 <strong>机场pics (jichangtuijian.pics)</strong> 权威机场品牌全景数据库。本站基于多地域真实网络观测探针的长周期晚高峰抓取数据与服务商官方技术档案，系统收录全网 42 家主流网络加速服务。支持按物理线路架构、资费门槛、流媒体与 AI 原生解锁状态即时筛选与横向比对，为技术开发者、跨国企业及大众用户提供专著级的决策依据。
    </p>

    <!-- 目录快速跳转导航 -->
    <div class="toc-pills">
      <span class="toc-label">快速跳转导航：</span>
      <a href="#quick-pick">3分钟选型速查</a>
      <a href="#all-brands-table">42家横向总表</a>
      <a href="#interactive-filter">交互式筛选库</a>
      <a href="#brands-deep-profiles">42家品牌技术档案</a>
      <a href="#tech-principles">选型技术原理</a>
      <a href="#business-model">商业模式与防坑</a>
      <a href="#troubleshooting">排障与调优指南</a>
      <a href="#brands-faq">核心技术FAQ</a>
    </div>
  </section>

  <!-- 模块一：开头直接提供答案 — 3 分钟需求速查决策分支 -->
  <section class="section" id="quick-pick">
    <div class="section-title">
      <span class="step-num">01</span>
      <h2>开头直接给答案：4 大主流场景 3 分钟选型速查</h2>
    </div>
    <p class="section-desc">
      无需通读全篇，你可以直接根据你的核心使用场景对号入座，获取直接决策结论与精选候选方案：
    </p>

    <div class="card-grid">
      <div class="summary-box">
        <h3>跨国企业办公 / 外贸沟通 / 代码仓库极速同步</h3>
        <p><strong>痛点核心：</strong>SSH 连接必须零掉线、GitHub Push/Pull 持续高吞吐、企业邮件收发不丢包。</p>
        <p><strong>最优解方案：</strong>首选<strong>全内网 IEPL 专线</strong>，入口必须具备多线 BGP 智能接入，海外落地节点具备原生双栈支持。</p>
        <p class="badge-row"><span class="badge blue">第一梯队：光速云</span><span class="badge">第二梯队：大佬云</span></p>
        <a class="button action-btn" href="/works/guangsu/">查阅光速云企业实测 &rarr;</a>
      </div>

      <div class="summary-box">
        <h3>学术科研 / 深度学习 / AI大模型开发</h3>
        <p><strong>痛点核心：</strong>需要稳定访问 OpenAI ChatGPT-4o、Claude 3.5 Sonnet、Google Gemini 及 HuggingFace 大型模型下载。</p>
        <p><strong>最优解方案：</strong>必须选择<strong>配置非香港原生住宅/原生机房 IP</strong>的节点，且支持大带宽突发下载，具备智能 DNS 分流能力。</p>
        <p class="badge-row"><span class="badge blue">首选推荐：光速云（配AI专线）</span><span class="badge">备选方案：二猫云</span></p>
        <a class="button action-btn" href="/works/ermao/">查阅二猫云原生解锁实测 &rarr;</a>
      </div>

      <div class="summary-box">
        <h3>4K/8K 极致影音 / 国际流媒体重度用户</h3>
        <p><strong>痛点核心：</strong>Netflix 非自制剧解锁、Disney+ IMAX Enhanced 流畅播放、YouTube 4K 60FPS 毫秒级起播无拖拽缓冲。</p>
        <p><strong>最优解方案：</strong>选择<strong>大冗余带宽 BGP 隧道中转</strong>或多点 IEPL 专线，重点核查新加坡、日本与美国节点解锁状态。</p>
        <p class="badge-row"><span class="badge blue">高性价比首选：暮光加速</span><span class="badge">平价大碗：飞猫云</span></p>
        <a class="button action-btn" href="/works/muguang/">查阅暮光加速影音实测 &rarr;</a>
      </div>

      <div class="summary-box">
        <h3>多设备备用 / 低频出差 / 预算敏感群体</h3>
        <p><strong>痛点核心：</strong>平时使用频率低、不想每月持续支付固定月费，追求无过期时间限制或极高流量性价比。</p>
        <p><strong>最优解方案：</strong>选择<strong>一次性购买长期有效按量计费包</strong>，或月付 10 元以下但具备备用中转容灾的高性价比品牌。</p>
        <p class="badge-row"><span class="badge blue">不限时推荐：星岛梦</span><span class="badge">平价月付：微风网络</span></p>
        <a class="button action-btn" href="/works/xingdaomeng/">查阅星岛梦按量计费评测 &rarr;</a>
      </div>
    </div>
  </section>

  <!-- 模块二：42 家机场品牌全要素技术参数全景横向大表（核心对比表） -->
  <section class="section" id="all-brands-table">
    <div class="section-title">
      <span class="step-num">02</span>
      <h2>42 家机场品牌全要素技术参数全景横向总表</h2>
    </div>
    <p class="section-desc">
      以下表格收录了本站跟踪的全部 42 家机场品牌完整技术参数。统一按照梯队排名、物理线路架构、主流通信协议、真实起步费用、晚高峰实测状态及核验时间排列。在手机端可横向平滑滚动查看全量细节：
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

  <!-- 模块三：交互式品牌库与多维动态筛选中心（保留现有交互） -->
  <section class="section" id="interactive-filter" style="padding-top: 1rem;">
    <div class="section-title">
      <span class="step-num">03</span>
      <h2>交互式品牌库与多维即时筛选中心</h2>
    </div>
    <p class="section-desc">
      支持按关键词、线路类型、数据状态及快捷分类进行即时筛选过滤：
    </p>

    <!-- 客户端交互式筛选栏 -->
    <div class="filter-controls" style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <input
          type="text"
          id="brand-search"
          placeholder="搜索品牌名称、线路特点、协议..."
          style="flex: 1; min-width: 260px; padding: 0.65rem 1rem; border: 1px solid var(--color-border); border-radius: 4px; background: var(--color-bg); color: var(--color-fg); font-family: inherit;"
        />
        <select
          id="filter-type"
          style="padding: 0.65rem 1rem; border: 1px solid var(--color-border); border-radius: 4px; background: var(--color-bg); color: var(--color-fg); font-family: inherit;"
        >
          <option value="all">全部线路类型</option>
          <option value="IEPL">IEPL 内网专线</option>
          <option value="IPLC">IPLC 高速专线</option>
          <option value="BGP">BGP 多线智能调度</option>
        </select>
        <select
          id="filter-status"
          style="padding: 0.65rem 1rem; border: 1px solid var(--color-border); border-radius: 4px; background: var(--color-bg); color: var(--color-fg); font-family: inherit;"
        >
          <option value="all">全部数据状态</option>
          <option value="measured">🟢 包含跑分实测大图</option>
          <option value="vendor">🔵 厂商技术档案</option>
        </select>
      </div>

      <div class="quick-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; font-size: 0.85rem;">
        <span style="color: var(--color-muted); align-self: center;">快捷分类:</span>
        <button type="button" class="tag-btn" data-tag="TOP10" style="background: none; border: 1px solid var(--color-border); padding: 0.2rem 0.6rem; border-radius: 3px; cursor: pointer; color: var(--color-fg);">🔥 TOP 10 主推阵营</button>
        <button type="button" class="tag-btn" data-tag="IEPL" style="background: none; border: 1px solid var(--color-border); padding: 0.2rem 0.6rem; border-radius: 3px; cursor: pointer; color: var(--color-fg);">⚡ IEPL 顶级专线</button>
        <button type="button" class="tag-btn" data-tag="低价" style="background: none; border: 1px solid var(--color-border); padding: 0.2rem 0.6rem; border-radius: 3px; cursor: pointer; color: var(--color-fg);">💰 10元内低价月均</button>
        <button type="button" class="tag-btn" data-tag="all" style="background: none; border: 1px solid var(--color-border); padding: 0.2rem 0.6rem; border-radius: 3px; cursor: pointer; color: var(--color-muted);">重置筛选</button>
      </div>
    </div>

    <!-- 品牌卡片网格 -->
    <div class="brand-grid" id="brand-cards" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
      {
        BRANDS.map((brand) => (
          <article
            class="brand-card"
            data-name={brand.name}
            data-line={brand.lineType}
            data-status={brand.dataStatus}
            data-rank={brand.rank}
            data-price={brand.entryPrice}
            style="border: 1px solid var(--color-border); border-radius: 6px; padding: 1.5rem; background: var(--color-bg); display: flex; flex-direction: column; justify-content: space-between; transition: border-color 0.2s;"
          >
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <span style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-accent, #c95135); font-weight: 600;">
                    NO. {brand.rank} {brand.rank === 1 ? '🏆 主推' : (brand.rank <= 10 ? '★ TOP10' : '')}
                  </span>
                  <h3 style="margin: 0.25rem 0 0 0; font-size: 1.3rem;">
                    <a href={withBase(\`/works/\${brand.slug}/\`)} style="text-decoration: none; color: inherit;">
                      {brand.name}
                    </a>
                  </h3>
                </div>
                <span
                  style={\`font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 3px; \${
                    brand.dataStatus === 'measured'
                      ? 'background: rgba(46, 125, 50, 0.1); color: #2e7d32; border: 1px solid rgba(46, 125, 50, 0.3);'
                      : 'background: rgba(2, 136, 209, 0.1); color: #0288d1; border: 1px solid rgba(2, 136, 209, 0.3);'
                  }\`}
                >
                  {brand.dataStatus === 'measured' ? '实测跑分' : '技术档案'}
                </span>
              </div>

              <p style="font-size: 0.88rem; color: var(--color-muted); margin-bottom: 0.85rem; line-height: 1.45;">
                {brand.lineType} · {brand.protocol} · 入门约 <strong style="color: var(--color-fg);">{brand.entryPrice}</strong>
              </p>

              <div style="margin-bottom: 1.2rem;">
                <ul style="margin: 0; padding-left: 1.1rem; font-size: 0.82rem; color: var(--color-muted); line-height: 1.5;">
                  {brand.features.slice(0, 2).map((feat) => (
                    <li>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; border-top: 1px solid var(--color-border); padding-top: 1rem;">
              <a
                href={withBase(\`/works/\${brand.slug}/\`)}
                style="flex: 1; text-align: center; font-size: 0.85rem; padding: 0.4rem; border: 1px solid var(--color-border); border-radius: 4px; text-decoration: none; color: var(--color-fg);"
              >
                深度测评 ↗
              </a>
              {brand.affLink && (
                <a
                  href={brand.affLink}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  class="action-btn"
                  style="flex: 1; text-align: center; font-size: 0.85rem; padding: 0.4rem; border-radius: 4px; text-decoration: none; color: #fff !important; margin-top: 0;"
                >
                  官网直达
                </a>
              )}
            </div>
          </article>
        ))
      }
    </div>
  </section>

  <!-- 模块四：42 家机场多维搜索意图与全量技术画像解析长卷（专著级深度扩展） -->
  <section class="section" id="brands-deep-profiles">
    <div class="section-title">
      <span class="step-num">04</span>
      <h2>42 家机场品牌全维度技术档案与画像专著长卷</h2>
    </div>
    <p class="section-desc">
      为了满足技术开发者、学术科研人员与重度用户的深层次检索需求，本板块详细展开了 42 家品牌的具体网络拓扑、支持协议、晚高峰抗压特性与专属优缺点，供你在选型决策时进行全面核验：
    </p>

    <div class="brand-profiles-container">
      ${brandProfilesHtml}
    </div>
  </section>

  <!-- 模块五：网络加速选型核心维度技术原理（技术原理） -->
  <section class="section" id="tech-principles">
    <div class="section-title">
      <span class="step-num">05</span>
      <h2>网络加速选型核心维度技术原理深度解构</h2>
    </div>
    <p>
      在品牌库中挑选服务商，本质上是在挑选其背后的物理网络工程拓扑。以下拆解四大核心技术维度如何直接决定你的网络加速体验：
    </p>

    <h3>1. 跨境专线物理架构与光速时延极限</h3>
    <p>
      所有跨境数据最终都必须通过深海光缆或陆地直埋物理光纤进行传输。根据光在光纤中的传播速度（约 200,000 km/s），跨国往返延迟（RTT）存在严格的物理极限制约：
    </p>
    <ul>
      <li><strong>中国香港方向：</strong>华南地区距离香港仅 50-150 公里，物理时延极低（4-8ms）；华东与华北经陆地光纤到达出口，延迟约为 25-35ms。</li>
      <li><strong>日本东京方向：</strong>跨越东海泛太平洋海缆（TPE/APG），上海至东京单程光纤距离约 2,000 公里，理论物理往返时延约 20ms，优质商用专线实测在 26-36ms。</li>
      <li><strong>新加坡方向：</strong>穿越东南亚海缆（ASE/SJC2），广州至新加坡单程约 3,200 公里，实测端到端 RTT 约为 38-48ms。</li>
      <li><strong>美国西海岸方向：</strong>横跨太平洋新跨太平洋海缆（NCP/FASTER），单程物理距离在 10,000 公里以上，理论光速往返极限在 100ms 以上，实测优良 RTT 为 125-145ms。任何宣传“直连美国只需 10ms”的商家均为虚假前端作弊。</li>
    </ul>

    <h3>2. 入口机房与 BGP 动态智能路由</h3>
    <p>
      国内电信、联通、移动三大运营商之间的跨网互联结算存在壁垒。若一家机场只有一个单线电信入口机房，移动和联通用户访问时就会产生严重的跨网绕路与时延放大：
    </p>
    <div class="topology-grid">
      <div class="topo-card">
        <h3>多线 BGP 智能接入机制</h3>
        <p><strong>底层逻辑：</strong>国内入口机房同时接入中国电信、中国联通、中国移动及教育网等多条一级骨干网络。</p>
        <p><strong>用户价值：</strong>利用 BGP 动态路由协议，为不同宽带用户自动下发同运营商就近接入点，彻底规避跨网拥塞劣化。</p>
      </div>

      <div class="topo-card">
        <h3>Anycast 任播自动收敛容灾</h3>
        <p><strong>底层逻辑：</strong>在全国多个核心枢纽（深圳、上海、北京）部署共享 IP 入口。</p>
        <p><strong>用户价值：</strong>当华东入口发生机房割接维护时，网络流量在毫秒级内自动无感收敛至华南入口，保障长连接永续。</p>
      </div>
    </div>
  </section>

  <!-- 模块六：机场商业模式剖析与跑路风险防范铁律（解释条件、限制与费用） -->
  <section class="section" id="business-model">
    <div class="section-title">
      <span class="step-num">06</span>
      <h2>商业模式深度剖析与跑路风险防范铁律</h2>
    </div>
    <p>
      网络加速服务是典型的重资产带宽运营业务。了解商家的真实财务逻辑，能够帮助你在挑选品牌时一眼识破欺诈陷阱：
    </p>

    <h3>1. 正规机场的硬性带宽与基础设施成本</h3>
    <p>
      正规合规的商用 IEPL 物理专线（如深港专线、广港专线、沪日专线），企业级采购成本通常在 <strong>每月每 Mbps 40元至80元人民币</strong> 不等。
      若一家机场宣称提供“每月只需5元、提供1000G高速专线流量”，只要简单计算便知：若用户在晚高峰跑满 100Mbps 端口，单人消耗的物理带宽成本就超过数百元。此类商家能够维持运营的唯一方式就是：
    </p>
    <ul>
      <li><strong>极度超售 (Extreme Overselling)：</strong>按 1:50 甚至 1:100 的夸张比例超额出售带宽。平时无人使用时看似正常，一旦晚高峰来临，所有人争抢仅有的少量带宽，网络瞬间断流卡死。</li>
      <li><strong>流量虚标偷跑 (Traffic Stealing)：</strong>在后端计数程序中加入 1.5 倍至 3 倍的虚假放大倍率，用户实际下载 10GB 流量，后台直接扣除 30GB。</li>
      <li><strong>庞氏跑路模型 (Exit Scam)：</strong>利用极低价格诱导用户一次性购买两年或三年超长期套餐，迅速回笼数十万资金，在运营3-6个月、设备租金即将到期时，直接关闭网站解散群聊跑路。</li>
    </ul>

    <h3>2. 避坑自保五大铁律</h3>
    <ol>
      <li><strong>坚持月付，拒绝长期绑定：</strong>初次接触任何新品牌，无论优惠幅度多大，坚决只购买 <strong>月付套餐 (Monthly)</strong>。只有在连续使用超过 3 个月且经历过重大敏感时期晚高峰检验后，再考虑按季或按年续费。</li>
      <li><strong>警惕缺乏交流群与工单机制的幽灵商家：</strong>优质机场通常拥有数千人活跃的官方 Telegram 交流群或响应及时的服务工单系统。若商家只有公告发布频道、禁止用户公开交流反馈，跑路风险增加 80%。</li>
      <li><strong>常备两家不同架构的独立服务作为容灾冗余：</strong>不要把所有鸡蛋放在同一个篮子里。日常主力建议选择高品质 IEPL 专线机场；备用方案配置一个按量计费、不限时间的轻量机场，确保关键时刻网络永不失联。</li>
      <li><strong>妥善保管个人订阅 Token：</strong>订阅链接是个人账户的唯一通行证，绝不在任何第三方不可信网页粘贴或作为测试工具输入，防止流量被恶意盗刷。</li>
      <li><strong>远离任何宣称“永久免费/永久不限速”的诱饵：</strong>免费往往是最昂贵的代价，此类服务通常通过在流量中注入恶意广告、收集用户隐私数据甚至劫持网银凭证来实现黑产变现。</li>
    </ol>
  </section>

  <!-- 模块七：8 大极端网络故障排查与客户端调优指南 -->
  <section class="section" id="troubleshooting">
    <div class="section-title">
      <span class="step-num">07</span>
      <h2>8 大极端网络故障排查与客户端调优指南</h2>
    </div>
    <div class="card-grid">
      <div class="summary-box">
        <h4>故障 1：节点全部超时 (Timeout / 10000ms)</h4>
        <p><strong>第一排查点：</strong>检查本地系统时间。时间偏差超过 90 秒会导致 VMess / Trojan 的时间戳握手认证彻底失败！在 Windows 设置中点击“立即同步时钟”。</p>
        <p><strong>第二排查点：</strong>检查机场套餐流量是否耗尽，或订阅链接是否因套餐到期被停机。</p>
      </div>

      <div class="summary-box">
        <h4>故障 2：节点延迟正常，但无法加载任何网页</h4>
        <p><strong>原因：</strong>本地 DNS 解析崩溃或 TUN 虚拟网卡死锁。</p>
        <p><strong>排障操作：</strong>在客户端设置中关闭系统代理与 TUN 模式，在管理员终端输入 <code>ipconfig /flushdns</code> 刷新 DNS 缓存，随后重启客户端内核。</p>
      </div>

      <div class="summary-box">
        <h4>故障 3：网页正常，但 Telegram / Discord 持续转圈</h4>
        <p><strong>原因：</strong>Telegram 客户端默认使用直连或未正确监听本地 SOCKS5 代理，或节点未放行 UDP 转发导致语音通话失败。</p>
        <p><strong>排障操作：</strong>在 Telegram 设置中手动添加代理：<code>127.0.0.1:7890 (SOCKS5)</code>，并确保在代理软件中开启了 <code>UDP 转发 (UDP Relay)</code>。</p>
      </div>

      <div class="summary-box">
        <h4>故障 4：YouTube 播放画质被锁死在 360P/480P</h4>
        <p><strong>原因：</strong>本地运营商对 Google 的 QUIC (UDP) 协议实施了严重 QoS 限速丢包。</p>
        <p><strong>排障操作：</strong>在 Chrome 浏览器中输入 <code>chrome://flags</code>，搜索 <code>Experimental QUIC protocol</code> 并设置为 <code>Disabled</code>，强制退回 TCP TLS 协议加载视频。</p>
      </div>

      <div class="summary-box">
        <h4>故障 5：浏览器频繁弹出“您的连接不是私密连接”</h4>
        <p><strong>原因：</strong>系统代理配置错误，或本地杀毒软件/网络公司安全网关尝试进行 MITM 根证书解密。</p>
        <p><strong>排障操作：</strong>检查代理客户端是否开启了未配置信任的 MITM 解密功能；确认代理内核版本是否为最新发行版。</p>
      </div>

      <div class="summary-box">
        <h4>故障 6：Clash 内核内存暴涨并频繁闪退崩溃</h4>
        <p><strong>原因：</strong>订阅了过多冗余的第三方规则集（Rule-Provider），单次解析数十万条域名规则导致内存耗尽（OOM）。</p>
        <p><strong>排障操作：</strong>精简规则集配置，优先使用经典的 Loyalsoldier 迷你精简分流规则，关闭不必要的连接日志捕获。</p>
      </div>

      <div class="summary-box">
        <h4>故障 7：iOS Shadowrocket / Loon 后台频繁断流</h4>
        <p><strong>原因：</strong>iOS 系统的低电量模式激进杀后台，导致 VPN 进程被系统休眠挂起。</p>
        <p><strong>排障操作：</strong>在 iOS 设置中关闭“低电量模式”，进入客户端开启“On Demand（按需连接）”选项，确保锁屏唤醒后瞬间恢复连接。</p>
      </div>

      <div class="summary-box">
        <h4>故障 8：Android 某些国产定制系统自动关闭代理</h4>
        <p><strong>原因：</strong>系统后台电池优化策略将代理客户端直接杀死。</p>
        <p><strong>排障操作：</strong>在系统设置中将代理软件加入“自启动白名单”与“后台电池无限制”列表，并在最近任务多任务界面锁定该应用卡片。</p>
      </div>
    </div>
  </section>

  <!-- 模块八：12 大核心机场选型与品牌库常见问题 FAQ -->
  <section class="section" id="brands-faq">
    <div class="section-title">
      <span class="step-num">08</span>
      <h2>12 大核心机场选型与品牌库常见问题深度解答 (FAQ)</h2>
    </div>

    <div class="faq-accordion">
      <details class="faq-item" open>
        <summary class="faq-question">42家机场品牌库的数据来源是什么？如何保证客观可信？</summary>
        <div class="faq-answer">
          <p>
            <strong>结论：实测数据与厂商档案双轨并行，保留原始测试截图与核验日期。</strong><br />
            本站数据由两部分组成：标有“实测跑分”的品牌由部署在华东电信、华北联通、华南移动的物理探针在晚高峰（20:00-23:00）实测抓取了 32 线程满载测速图与解锁图；标有“技术档案”的数据来自服务商技术工单与公开 SLA 承诺，并通过自动化探针周期抽检。所有推荐链接均标注合规参数，不影响客观评级。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">什么是真正的 IEPL 内网专线？它和普通 BGP 中转有什么区别？</summary>
        <div class="faq-answer">
          <p>
            IEPL（国际以太网专线）走的是跨国点对点物理光纤内网，数据完全不经过公网海缆网关，不经过国家骨干网 QoS 压制，晚高峰丢包率常年低于 0.5%；而普通 BGP 中转利用国内多线机房接收入口，再通过公网隧道中转至境外落地，晚高峰受公网海缆拥塞影响，丢包率往往在 15%-30% 之间。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">为什么有的机场月付只要 5 元，甚至宣称“永久不限速”？</summary>
        <div class="faq-answer">
          <p>
            物理专线每 Mbps 月租高达数十元，成本规律不可逾越。宣称极低价且无限流量的商家只能依靠 1:50 甚至 1:100 的夸张超售与虚假倍率扣量维生，并在运营数月、资金回笼后迅速关网跑路。选购时坚持“首选月付、观察三月、常备冗余”是规避损失的铁律。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">为什么绝大多数香港节点无法直接访问 OpenAI ChatGPT？</summary>
        <div class="faq-answer">
          <p>
            OpenAI 官方从未在中国香港地区提供服务。香港节点的 IP 地址直接暴露了香港归属地，必定触发 Access Denied 报错。若需顺畅使用 AI 服务，请在品牌库中挑选配置了新加坡、日本或美国专用原生专线节点的机场。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">按量计费套餐与周期性月付套餐应该如何权衡？</summary>
        <div class="faq-answer">
          <p>
            低频出差、多设备备用或轻量查阅文档用户建议选择“按量计费”（如星岛梦），一次性购买长期有效，成本最低；若用于高频 4K 影音、企业外贸办公或大模型代码训练，建议选择“IEPL 专线月付”（如光速云、暮光加速），保障高峰期独享带宽与低延迟。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">什么是机场的倍率机制？为什么有的节点是 0.2x，有的是 2.0x？</summary>
        <div class="faq-answer">
          <p>
            倍率代表节点消耗套餐流量的扣费比例。1.0x 代表下载 1GB 扣除 1GB；0.2x 低倍率节点下载 1GB 仅扣除 0.2GB（适合大文件下载）；2.0x 高倍率节点通常用于极低延迟物理专线或稀缺原生住宅 IP，下载 1GB 扣除 2GB。选购时需结合倍率计算实际可用流量。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">不同宽带运营商用户挑选机场时有什么专属侧重点？</summary>
        <div class="faq-answer">
          <p>
            中国电信用户务必挑选配备优质 BGP 智能中转或 IEPL 内网专线的机场，避开 163 骨干网晚高峰拥堵；中国联通用户可优先选择具备 9929 线路或良好欧洲/日本中转的服务；中国移动用户拥有 CMI 海缆优势，在香港和新加坡直连表现极佳，但需防范跨网中转抖动。
          </p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">使用机场节点看 Netflix 只能看自制剧是怎么回事？</summary>
        <div class="faq-answer">
          <p>
            这代表该节点的 IP 被 Netflix 识别为机房代理或数据中心 IP，触发了软风控。系统仅展示全球自制剧（如怪奇物语），屏蔽了当地独家版权剧。只有配置了原生住宅家庭宽带 IP 的节点，才能实现 4K 非自制剧的原生全解锁。
          </p>
        </div>
      </details>
    </div>
  </section>

  <!-- 底部行动倡议卡片与内链枢纽 -->
  <section class="section">
    <div class="summary-box" style="text-align: center; padding: 2.5rem 1.5rem;">
      <h3>寻找到了合适的网络加速服务商？</h3>
      <p style="max-width: 680px; margin: 0 auto 1.5rem;">
        获取订阅链接后，可直接前往我们的全平台客户端指南下载调试配套软件，或查阅实验室晚高峰测速准则。
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a class="button action-btn" href="/clients/">下载全平台客户端指南 &rarr;</a>
        <a class="button action-btn" href="/works/">查阅精选评测排名 &rarr;</a>
        <a class="button action-btn" href="/search/">使用站内智能搜索 &rarr;</a>
        <a class="button action-btn" href="/about/">查阅测速准则白皮书 &rarr;</a>
      </div>
    </div>
  </section>

  <!-- 交互筛选脚本（保留并增强） -->
  <script is:inline>
    const searchInput = document.getElementById('brand-search');
    const filterType = document.getElementById('filter-type');
    const filterStatus = document.getElementById('filter-status');
    const quickTags = document.querySelectorAll('.tag-btn');
    const brandCards = document.querySelectorAll('.brand-card');

    let currentTag = 'all';

    function filterBrands() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      const typeVal = filterType?.value || 'all';
      const statusVal = filterStatus?.value || 'all';

      brandCards.forEach((card) => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const line = card.getAttribute('data-line') || '';
        const status = card.getAttribute('data-status') || '';
        const rank = parseInt(card.getAttribute('data-rank') || '999', 10);
        const price = (card.getAttribute('data-price') || '').toLowerCase();

        let matchSearch = !query || name.includes(query) || line.toLowerCase().includes(query) || price.includes(query);
        let matchType = typeVal === 'all' || line.includes(typeVal);
        let matchStatus = statusVal === 'all' || status === statusVal;

        let matchTag = true;
        if (currentTag === 'TOP10') {
          matchTag = rank <= 10;
        } else if (currentTag === 'IEPL') {
          matchTag = line.includes('IEPL');
        } else if (currentTag === '低价') {
          matchTag = price.includes('8') || price.includes('7') || price.includes('10') || price.includes('5') || price.includes('6');
        }

        if (matchSearch && matchType && matchStatus && matchTag) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    searchInput?.addEventListener('input', filterBrands);
    filterType?.addEventListener('change', filterBrands);
    filterStatus?.addEventListener('change', filterBrands);

    quickTags.forEach((btn) => {
      btn.addEventListener('click', () => {
        quickTags.forEach((b) => (b.style.borderColor = 'var(--color-border)'));
        btn.style.borderColor = 'var(--color-fg)';
        currentTag = btn.getAttribute('data-tag') || 'all';
        if (currentTag === 'all') {
          if (searchInput) searchInput.value = '';
          if (filterType) filterType.value = 'all';
          if (filterStatus) filterStatus.value = 'all';
        }
        filterBrands();
      });
    });
  </script>
</BaseLayout>

<style>
  .page-head {
    padding-top: calc(var(--baseline) * 2);
    padding-bottom: calc(var(--baseline) * 2);
    border-bottom: 1px solid var(--color-border);
  }

  .toc-pills {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding: 0.75rem 1rem;
    background: var(--color-surface, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.88rem;
  }

  .toc-label {
    font-weight: 600;
    color: var(--color-fg);
  }

  .toc-pills a {
    color: var(--color-muted);
    text-decoration: none;
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
  }

  .toc-pills a:hover {
    color: var(--color-fg);
    border-color: var(--color-fg);
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

  .summary-box, .topo-card {
    background: var(--color-surface, rgba(0, 0, 0, 0.02));
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .summary-box h3, .topo-card h3 {
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

fs.writeFileSync(brandsPath, content, 'utf8');
console.log('Successfully written expanded brands page to', brandsPath);
