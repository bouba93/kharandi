// Service de Facturation et Suivi de Consommation Kharandi

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Invoice {
  id: string; // Ex: KH-FACT-2026-04812
  orderNumber: string; // Ex: CMD-2026-7819
  date: string; // ISO date
  dueDate: string; // ISO date
  planId: string;
  planName: string;
  period: string; // Ex: "Annuel (12 mois)", "Mensuel (30 jours)"
  periodStart: string;
  periodEnd: string;
  amount: number; // en GNF
  currency: string;
  taxRate: number; // Ex: 0% pour éducation
  taxAmount: number;
  totalTTC: number;
  status: 'paid' | 'pending' | 'cancelled';
  paymentMethod: 'Orange Money Guinée' | 'MTN Mobile Money' | 'Carte Bancaire' | 'Wallet Kharandi';
  paymentReference: string;
  client: {
    name: string;
    phone: string;
    email: string;
    city: string;
    role: string;
  };
  company: {
    name: string;
    legalStatus: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    rccm: string;
    nif?: string;
    website: string;
  };
}

export interface SubscriptionUsage {
  planId: string;
  planName: string;
  status: 'active' | 'expiring_soon' | 'expired' | 'free';
  startDate: string;
  endDate: string;
  daysTotal: number;
  daysUsed: number;
  daysRemaining: number;
  percentTimeUsed: number;
  quotas: {
    aiKaramo: {
      used: number;
      limit: number; // -1 pour illimité
      unit: string;
      label: string;
    };
    examSubjects: {
      used: number;
      limit: number;
      unit: string;
      label: string;
    };
    zoomClasses: {
      used: number;
      limit: number;
      unit: string;
      label: string;
    };
    tutorContacts: {
      used: number;
      limit: number;
      unit: string;
      label: string;
    };
    schoolRankings: {
      unlocked: boolean;
      label: string;
    };
    walletPoints: {
      earned: number;
      balance: number;
      label: string;
    };
  };
}

const DEFAULT_COMPANY = {
  name: "KHARANDI ÉDUCATION GUINÉE",
  legalStatus: "SARL au capital de 10 000 000 GNF",
  address: "Belle-Vue, en Face du commissariat, Commune de Dixinn",
  city: "Conakry",
  country: "République de Guinée",
  phone: "+224 626 18 71 17",
  email: "contactkharandi@gmail.com",
  rccm: "GN.TCC.2022.B.14786",
  website: "https://kharandi.gn",
};

/**
 * Récupère ou initialise l'historique des factures de l'utilisateur
 */
export function getUserInvoices(userProfile: any): Invoice[] {
  if (!userProfile?.uid && !userProfile?.email) return [];
  const key = `kharandi_invoices_${userProfile.uid || userProfile.email}`;
  const stored = localStorage.getItem(key);

  if (stored) {
    try {
      const parsed: Invoice[] = JSON.parse(stored);
      return parsed.map(inv => ({
        ...inv,
        company: DEFAULT_COMPANY
      }));
    } catch (e) {
      console.error("Erreur lecture factures:", e);
    }
  }

  // Génération des factures initiales cohérentes selon le plan actuel
  const now = new Date();
  const dateStr = now.toISOString();
  const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const sixMonthsAgo = new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString();

  const isPaid = userProfile.subscriptionPlan && userProfile.subscriptionPlan !== 'free';
  const role = userProfile.role || 'student';

  const defaultInvoices: Invoice[] = [];

  if (isPaid || userProfile.isApproved) {
    // Facture d'abonnement actif
    const planName = userProfile.subscriptionPlan === 'palmares' 
      ? 'Pass Palmarès National des Écoles' 
      : role === 'repetiteur' 
        ? 'Abonnement Mensuel Répétiteur Pro' 
        : role === 'seller'
          ? 'Pack Vendeur Kharandi Makiti'
          : 'Forfait Annuel Élève d’Excellence';
    
    const amount = userProfile.subscriptionPlan === 'palmares' ? 250000 : role === 'repetiteur' ? 50000 : 45000;

    defaultInvoices.push({
      id: `KH-FACT-${now.getFullYear()}-08421`,
      orderNumber: `CMD-${now.getFullYear()}-9412`,
      date: sixMonthsAgo,
      dueDate: sixMonthsAgo,
      planId: userProfile.subscriptionPlan || 'student',
      planName,
      period: "Annuel (365 jours)",
      periodStart: sixMonthsAgo,
      periodEnd: oneYearLater,
      amount,
      currency: "GNF",
      taxRate: 0,
      taxAmount: 0,
      totalTTC: amount,
      status: 'paid',
      paymentMethod: 'Orange Money Guinée',
      paymentReference: `OM-GN-${Math.floor(1000000 + Math.random() * 9000000)}`,
      client: {
        name: userProfile.name || 'Élève Kharandi',
        phone: userProfile.phone || '+224 620 00 00 00',
        email: userProfile.email || 'abonne@kharandi.gn',
        city: userProfile.city || 'Conakry, Guinée',
        role: role.toUpperCase(),
      },
      company: DEFAULT_COMPANY,
    });
  } else {
    // Facture de mise en service découverte
    defaultInvoices.push({
      id: `KH-FACT-${now.getFullYear()}-00109`,
      orderNumber: `CMD-${now.getFullYear()}-1045`,
      date: dateStr,
      dueDate: dateStr,
      planId: 'free',
      planName: 'Formule Découverte & Accès Général',
      period: "Accès Gratuit Permanent",
      periodStart: dateStr,
      periodEnd: oneYearLater,
      amount: 0,
      currency: "GNF",
      taxRate: 0,
      taxAmount: 0,
      totalTTC: 0,
      status: 'paid',
      paymentMethod: 'Wallet Kharandi',
      paymentReference: 'GRATUIT-SYSTEME-00',
      client: {
        name: userProfile.name || 'Utilisateur Kharandi',
        phone: userProfile.phone || '+224 600 00 00 00',
        email: userProfile.email || 'utilisateur@kharandi.gn',
        city: userProfile.city || 'Conakry, Guinée',
        role: role.toUpperCase(),
      },
      company: DEFAULT_COMPANY,
    });
  }

  localStorage.setItem(key, JSON.stringify(defaultInvoices));
  return defaultInvoices;
}

/**
 * Enregistre une nouvelle facture suite à un paiement d'abonnement
 */
export function recordNewInvoice(userProfile: any, planDetails: {
  planId: string;
  planName: string;
  amount: number;
  period: string;
  paymentMethod?: 'Orange Money Guinée' | 'MTN Mobile Money' | 'Carte Bancaire' | 'Wallet Kharandi';
  paymentReference?: string;
}): Invoice {
  const now = new Date();
  const dateStr = now.toISOString();
  const durationDays = planDetails.period.toLowerCase().includes('mensuel') ? 30 : 365;
  const endDateStr = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000).toISOString();

  const newInvoice: Invoice = {
    id: `KH-FACT-${now.getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
    orderNumber: `CMD-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: dateStr,
    dueDate: dateStr,
    planId: planDetails.planId,
    planName: planDetails.planName,
    period: planDetails.period,
    periodStart: dateStr,
    periodEnd: endDateStr,
    amount: planDetails.amount,
    currency: "GNF",
    taxRate: 0,
    taxAmount: 0,
    totalTTC: planDetails.amount,
    status: 'paid',
    paymentMethod: planDetails.paymentMethod || 'Orange Money Guinée',
    paymentReference: planDetails.paymentReference || `PAY-GN-${Date.now().toString().slice(-8)}`,
    client: {
      name: userProfile.name || 'Utilisateur Kharandi',
      phone: userProfile.phone || '+224 620 00 00 00',
      email: userProfile.email || 'abonne@kharandi.gn',
      city: userProfile.city || 'Conakry, Guinée',
      role: (userProfile.role || 'student').toUpperCase(),
    },
    company: DEFAULT_COMPANY,
  };

  const key = `kharandi_invoices_${userProfile.uid || userProfile.email}`;
  const existing = getUserInvoices(userProfile);
  const updated = [newInvoice, ...existing.filter(i => i.id !== newInvoice.id)];
  localStorage.setItem(key, JSON.stringify(updated));

  return newInvoice;
}

/**
 * Calcule la consommation et l'usage en temps réel de l'abonnement
 */
export function getSubscriptionUsage(userProfile: any): SubscriptionUsage {
  const isPalmares = userProfile?.subscriptionPlan === 'palmares' || localStorage.getItem('kharandi_palmares_unlocked') === 'true';
  const isPaid = (userProfile?.subscriptionPlan && userProfile.subscriptionPlan !== 'free') || isPalmares || userProfile?.isApproved;
  const role = userProfile?.role || 'student';

  const now = new Date();
  // Période par défaut : 365 jours pour forfait annuel, 30 jours pour mensuel
  const isMonthly = role === 'repetiteur' && !isPalmares;
  const daysTotal = isMonthly ? 30 : 365;

  // Calcul basé sur l'ancienneté ou clé locale
  const usageKey = `kharandi_usage_metrics_${userProfile?.uid || userProfile?.email || 'guest'}`;
  let storedMetrics: any = null;
  try {
    const s = localStorage.getItem(usageKey);
    if (s) storedMetrics = JSON.parse(s);
  } catch (e) {
    // ignore
  }

  // Jours consommés (calcul simulé réaliste ou stocké)
  const daysUsed = storedMetrics?.daysUsed ?? (isPaid ? Math.min(Math.floor(daysTotal * 0.35), daysTotal - 1) : 0);
  const daysRemaining = Math.max(0, daysTotal - daysUsed);
  const percentTimeUsed = Math.min(100, Math.round((daysUsed / daysTotal) * 100));

  const startDate = new Date(now.getTime() - daysUsed * 24 * 60 * 60 * 1000).toISOString();
  const endDate = new Date(now.getTime() + daysRemaining * 24 * 60 * 60 * 1000).toISOString();

  let status: 'active' | 'expiring_soon' | 'expired' | 'free' = 'free';
  if (isPaid) {
    if (daysRemaining <= 7) status = 'expiring_soon';
    else if (daysRemaining === 0) status = 'expired';
    else status = 'active';
  }

  const planName = isPalmares 
    ? 'Forfait Palmarès National des Écoles'
    : userProfile?.subscriptionPlan === 'annuel' || userProfile?.subscriptionPlan === 'student'
      ? 'Forfait Annuel Élève d’Excellence'
      : role === 'repetiteur'
        ? 'Abonnement Mensuel Répétiteur Pro'
        : role === 'seller'
          ? 'Pack Vendeur Kharandi Makiti'
          : isPaid
            ? `Forfait ${userProfile?.subscriptionPlan || 'Actif'}`
            : 'Formule Découverte (Gratuit)';

  // Quotas selon le plan
  return {
    planId: userProfile?.subscriptionPlan || 'free',
    planName,
    status,
    startDate,
    endDate,
    daysTotal,
    daysUsed,
    daysRemaining,
    percentTimeUsed,
    quotas: {
      aiKaramo: {
        used: storedMetrics?.aiKaramoUsed ?? 48,
        limit: isPaid ? -1 : 15, // -1 = illimité
        unit: "questions",
        label: "Assistant IA Karamo",
      },
      examSubjects: {
        used: storedMetrics?.subjectsUsed ?? 34,
        limit: isPaid ? -1 : 5,
        unit: "sujets & traités",
        label: "Sujets d'Examens CEE, BEPC, BAC",
      },
      zoomClasses: {
        used: storedMetrics?.zoomUsed ?? 3,
        limit: isPaid ? 12 : 1,
        unit: "séances suivies",
        label: "Classes Virtuelles Zoom",
      },
      tutorContacts: {
        used: storedMetrics?.tutorContacts ?? 6,
        limit: isPaid ? -1 : 2,
        unit: "mises en relation",
        label: "Contacts Répétiteurs Débloqués",
      },
      schoolRankings: {
        unlocked: isPalmares || userProfile?.role === 'admin',
        label: "Audits & Fiches du Palmarès",
      },
      walletPoints: {
        earned: userProfile?.points || 150,
        balance: userProfile?.points || 150,
        label: "Points Kharandi Gagnés",
      },
    },
  };
}

/**
 * Génère le document HTML imprimable / téléchargeable en PDF pour la facture
 */
export function printInvoiceDocument(invoice: Invoice) {
  const printWindow = window.open('', '_blank', 'width=850,height=1050');
  if (!printWindow) {
    // Si popup bloquée, alert
    alert("Veuillez autoriser les fenêtres pop-up pour imprimer ou télécharger votre facture en PDF.");
    return;
  }

  const formatGNF = (n: number) => new Intl.NumberFormat('fr-GN').format(n) + ' GNF';
  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return d;
    }
  };

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Facture Officielle ${invoice.id} - Kharandi Guinée</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    body { background: #f8fafc; color: #0f172a; padding: 32px 24px; font-size: 13px; line-height: 1.5; }
    .invoice-card { max-width: 800px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 28px; margin-bottom: 28px; }
    .brand { display: flex; align-items: center; gap: 16px; }
    .logo-img { width: 64px; height: 64px; object-fit: contain; }
    .brand-title { font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; }
    .brand-sub { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px; }
    
    .invoice-meta { text-align: right; }
    .invoice-badge { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 800; font-size: 11px; padding: 4px 12px; border-radius: 999px; border: 1px solid #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .invoice-id { font-size: 22px; font-weight: 900; color: #0f172a; }
    .invoice-date { font-size: 12px; color: #64748b; font-weight: 600; margin-top: 2px; }

    .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; background: #f8fafc; padding: 22px 24px; border-radius: 16px; margin-bottom: 32px; border: 1px solid #edf2f7; }
    .party-title { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 8px; }
    .party-name { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
    .party-detail { font-size: 12px; color: #475569; margin-bottom: 2px; }

    .table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
    .table th { background: #f1f5f9; color: #475569; font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; padding: 12px 16px; text-align: left; }
    .table th:last-child { text-align: right; }
    .table td { padding: 16px; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 13px; vertical-align: top; }
    .table td:last-child { text-align: right; font-weight: 700; }
    .item-desc { font-weight: 800; color: #0f172a; font-size: 14px; margin-bottom: 4px; }
    .item-sub { font-size: 11px; color: #64748b; }

    .totals-container { display: flex; justify-content: flex-end; margin-bottom: 36px; }
    .totals-box { width: 340px; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 16px; padding: 18px 22px; }
    .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600; }
    .total-row.final { border-top: 2px dashed #cbd5e1; margin-top: 8px; padding-top: 12px; font-size: 17px; font-weight: 900; color: #0f172a; }
    .total-row.final span:last-child { color: #0284c7; }

    .payment-info { display: flex; justify-content: space-between; align-items: center; background: #eff6ff; border: 1px solid #bfdbfe; padding: 16px 20px; border-radius: 14px; margin-bottom: 36px; }
    .payment-label { font-size: 11px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5px; }
    .payment-value { font-size: 13px; font-weight: 800; color: #1e3a8a; margin-top: 2px; }

    .footer { display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #f1f5f9; padding-top: 28px; }
    .legal-notice { font-size: 11px; color: #94a3b8; max-width: 440px; line-height: 1.6; }
    
    .stamp-box { border: 2px solid #059669; border-radius: 12px; padding: 12px 18px; text-align: center; color: #059669; background: #ecfdf5; transform: rotate(-2deg); }
    .stamp-title { font-weight: 900; font-size: 13px; letter-spacing: 1px; }
    .stamp-sub { font-size: 9px; font-weight: 800; margin-top: 2px; text-transform: uppercase; }

    .print-actions { max-width: 800px; margin: 0 auto 24px; display: flex; justify-content: flex-end; gap: 12px; }
    .btn-print { background: #18bfd6; color: white; border: none; padding: 10px 22px; border-radius: 12px; font-weight: 800; font-size: 13px; cursor: pointer; box-shadow: 0 4px 12px rgba(24,191,214,0.3); transition: all 0.2s; }
    .btn-print:hover { background: #139cb0; }
    .btn-close { background: #e2e8f0; color: #334155; border: none; padding: 10px 18px; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; }

    @media print {
      body { background: #fff; padding: 0; }
      .invoice-card { border: none; box-shadow: none; padding: 20px; }
      .print-actions { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-actions">
    <button class="btn-close" onclick="window.close()">Fermer</button>
    <button class="btn-print" onclick="window.print()">📥 Imprimer / Enregistrer en PDF</button>
  </div>

  <div class="invoice-card">
    <div class="header">
      <div class="brand">
        <img src="https://lh3.googleusercontent.com/d/1NnKKOKkq_li7F4_dNgGBVUXHR_K2xL55" alt="Kharandi Logo" class="logo-img" />
        <div>
          <h1 class="brand-title">KHARANDI ÉDUCATION</h1>
          <p class="brand-sub">Plateforme Éducative Nationale de Guinée</p>
        </div>
      </div>
      <div class="invoice-meta">
        <span class="invoice-badge">✓ Facture Payée & Validée</span>
        <div class="invoice-id">${invoice.id}</div>
        <div class="invoice-date">Date d'émission : ${formatDate(invoice.date)}</div>
      </div>
    </div>

    <div class="parties">
      <div>
        <div class="party-title">Émetteur / Prestataire</div>
        <div class="party-name">${invoice.company.name}</div>
        <div class="party-detail">${invoice.company.legalStatus}</div>
        <div class="party-detail">${invoice.company.address}</div>
        <div class="party-detail">${invoice.company.city} - ${invoice.company.country}</div>
        <div class="party-detail">RCCM : ${invoice.company.rccm}${invoice.company.nif ? ` | NIF : ${invoice.company.nif}` : ''}</div>
        <div class="party-detail">Tél : ${invoice.company.phone}</div>
      </div>

      <div>
        <div class="party-title">Destinataire / Abonné(e)</div>
        <div class="party-name">${invoice.client.name}</div>
        <div class="party-detail">Profil : <strong>${invoice.client.role}</strong></div>
        <div class="party-detail">Téléphone : ${invoice.client.phone}</div>
        <div class="party-detail">Email : ${invoice.client.email}</div>
        <div class="party-detail">Ville : ${invoice.client.city}</div>
        <div class="party-detail">N° Commande : ${invoice.orderNumber}</div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Désignation de la prestation</th>
          <th>Période de validité</th>
          <th>Quantité</th>
          <th>Total Net</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="item-desc">${invoice.planName}</div>
            <div class="item-sub">Accès complet à la plateforme Kharandi, assistant IA Karamo, sujets d'examens officiels et services associés.</div>
          </td>
          <td>
            <strong>${invoice.period}</strong><br />
            <span style="font-size:11px;color:#64748b;">Du ${formatDate(invoice.periodStart)} au ${formatDate(invoice.periodEnd)}</span>
          </td>
          <td>1</td>
          <td>${formatGNF(invoice.amount)}</td>
        </tr>
      </tbody>
    </table>

    <div class="totals-container">
      <div class="totals-box">
        <div class="total-row">
          <span>Sous-total HT</span>
          <span>${formatGNF(invoice.amount)}</span>
        </div>
        <div class="total-row">
          <span>TVA (Exonération Éducation Art. 219)</span>
          <span>0 GNF (0%)</span>
        </div>
        <div class="total-row final">
          <span>Total Net Réglé (TTC)</span>
          <span>${formatGNF(invoice.totalTTC)}</span>
        </div>
      </div>
    </div>

    <div class="payment-info">
      <div>
        <div class="payment-label">Moyen de règlement</div>
        <div class="payment-value">✓ ${invoice.paymentMethod}</div>
      </div>
      <div>
        <div class="payment-label">Réf. Transaction</div>
        <div class="payment-value">${invoice.paymentReference}</div>
      </div>
      <div>
        <div class="payment-label">Statut du paiement</div>
        <div class="payment-value" style="color:#059669;">RÉGLÉ EN TOTALITÉ</div>
      </div>
    </div>

    <div class="footer">
      <div class="legal-notice">
        <strong>Informations légales & Garantie :</strong><br />
        Ce document certifie le règlement intégral de l'abonnement souscrit sur la plateforme Kharandi. 
        Pour toute assistance ou demande comptable, contactez notre support à <strong>${invoice.company.email}</strong> ou au <strong>${invoice.company.phone}</strong>.
      </div>

      <div class="stamp-box">
        <div class="stamp-title">PAIEMENT CONFIRMÉ</div>
        <div class="stamp-sub">DIRECTION FINANCIÈRE KHARANDI</div>
        <div style="font-size:8px;margin-top:2px;opacity:0.8;">CONAKRY, RÉP. DE GUINÉE</div>
      </div>
    </div>
  </div>

  <script>
    // Auto-focus pour impression rapide si souhaité
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
