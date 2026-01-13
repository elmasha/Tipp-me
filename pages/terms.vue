<template>
<v-app dark style="background-color: black;color: white;" class="container parallax">
    <div class="container">
        <v-btn icon color="white" @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
    </div>
    <div class="d-flex">

        <v-chip-group column class="ma-4" active-class="green--text">
            <v-chip @click="title = 'Terms and conditions',terms =true,privacy = false, compliance = false,fundraising = false, restaurant_terms = false">Terms and conditions</v-chip>
            <v-chip @click="title = 'Privacy policy',terms =false,privacy = true, compliance = false,fundraising = false, restaurant_terms = false">Privacy policy</v-chip>
            <v-chip @click="title = 'Compliance',terms =false,privacy = false, compliance = true,fundraising = false, restaurant_terms = false">Compliance</v-chip>
            <v-chip @click="title = 'Fundraising',terms =false,privacy = false, compliance = false,fundraising = true, restaurant_terms = false">Fundraising</v-chip>
            <v-chip @click="title = 'Restaurant-terms',terms =false,privacy = false, compliance = false,fundraising = false, restaurant_terms = true">Restaurant-terms</v-chip>
        </v-chip-group>
    </div>
    <!-- <h1 style="color: white;" class="ma-4">{{ title }}</h1> -->
     <br>
     <br>
    <div v-show="terms">
        <section class="legal">
            <h1 style="font-size:2.2rem">Terms & Conditions</h1>

            <h3>1. Introduction</h3>
            <p>
                These Terms and Conditions (“Terms”) govern the access to and use of the TipMe digital platform (“Platform”), operated by TipMe (“the Company”, “we”, “us”, or “our”).

                By accessing, registering on, or using the Platform, you (“User”) acknowledge that you have read, understood, and agreed to be bound by these Terms.
            </p>

            <h3>2. Nature of the Platform</h3>

            <p>TipMe is a digital facilitation platform that enables users to receive voluntary tips and contributions through licensed mobile money payment systems, including M-Pesa.
            </p>
            <p>TipMe:
            </p>

            <ul>
                <li>Does not operate as a bank or financial institution</li>
                <li>Does not issue electronic money</li>
                <li>Does not provide lending, credit, or savings services</li>
                <li>Does not guarantee earnings or fundraising outcomes</li>
            </ul>
            <p>The Platform acts solely as a technical intermediary facilitating payments between supporters and recipients.
            </p>

            <h3>3. Eligibility</h3>

            <p>To use the Platform, Users must:</p>
            <ul>
                <li>Be at least 18 years of age</li>
                <li>Possess a valid M-Pesa registered mobile number</li>
                <li>Have legal capacity to enter into binding agreements</li>
            </ul>

            <p>Use the Platform solely for lawful purposes</p>

            <p>TipMe reserves the right to verify user information and deny access at its discretion.</p>

            <h3>4. Payments & Transactions</h3>

            <p>All payments made through TipMe:</p>
            <ul>
                <li>Are voluntary</li>
                <li>Are non-refundable</li>
                <li>Are processed via licensed third-party payment providers</li>
            </ul>

            <p>Once a payment is confirmed through M-Pesa, it cannot be reversed through TipMe.
            </p>
            <p>TipMe bears no responsibility for disputes between supporters and recipients.</p>

            <h3>5. Fees & Charges</h3>
            <p>TipMe charges a platform service fee, typically ranging between 3% and 5% per transaction.
            </p>
            <p>Fees are deducted prior to wallet balance reflection</p>

            <p>M-Pesa transaction charges may apply and are typically borne by the supporter</p>

            <p>Withdrawal fees may apply and will be disclosed prior to processing</p>

            <p>TipMe reserves the right to revise fees with reasonable notice.
            </p>
            <h3>6. Wallet & Settlement</h3>

            <p>Wallet balances displayed on TipMe represent internal ledger entries and do not constitute stored value or deposits.</p>

            <p>Withdrawals are subject to:</p>

            <ul>
                <li>Settlement periods</li>
                <li>Minimum withdrawal thresholds</li>
                <li>Daily withdrawal limits</li>
                <li>Compliance and fraud checks</li>
            </ul>

            <p>Daily withdrawal limits</p>

            <p>Compliance and fraud checks</p>

            <p>TipMe reserves the right to delay or suspend withdrawals where necessary.
            </p>

            <h3>7. Suspension & Termination</h3>

            <p>TipMe may suspend, restrict, or terminate access to the Platform where:</p>

            <p>Fraud or misuse is suspected</p>

            <p>Legal or regulatory obligations require action</p>

            <p>These Terms are breached</p>

            <p>Outstanding balances may be withheld pending investigation.</p>

            <h3>8. Limitation of Liability</h3>

            <p>To the fullest extent permitted under Kenyan law, TipMe shall not be liable for:</p>

            <p>Loss of income or anticipated earnings</p>

            <p>Fundraising shortfalls</p>

            <p>Third-party payment system failures</p>

            <p>Indirect or consequential losses</p>

            <h3>9. Governing Law</h3>

            <p>These Terms are governed by and construed in accordance with the laws of the Republic of Kenya.</p>
        </section>
    </div>
    <div v-show="privacy">
        <h1 style="font-size:2.2rem">PRIVACY POLICY </h1>
        <h3>
            TipMe respects your privacy.</h3>

        <p>We collect:
        </p>

        <ul>
            <li>Account details
            </li>
            <li>Transaction data
            </li>
            <li>Device & usage data (basic)
            </li>

        </ul>

        <b>We do not:
        </b>

        <ul>
            <li>Sell user data</li>
            <li>Share data without legal cause</li>
            <li>Store M-Pesa PINs or sensitive credentials
            </li>
        </ul>

        <p>Your data is protected and used responsibly.</p>
    </div>
    <div v-show="compliance">
        <h1>CBK-FACING COMPLIANCE</h1>
        (For banks, partners, and regulators)

        <h3>Platform Classification</h3>

        <p>TipMe operates as a payment facilitation and aggregation platform.
        </p>
        <h3>Regulatory Position
        </h3>

        <ul>
            <li>
                Payments processed via licensed M-Pesa infrastructure

            </li>
            <li>No issuance of e-money</li>
            <li> No storage of customer funds beyond settlement
            </li>
            <li>Ledger-based accounting only</li>

        </ul>

        <h3>Risk Controls</h3>
        <ul>
            <li>T+1 settlement delays</li>
            <li>Withdrawal limits</li>
            <li> Fraud detection</li>
            <li>AML monitoring</li>

        </ul>

        <h3> Legal Alignment
        </h3>

        <p>TipMe aligns with:
        </p>
        <ul>
            <li>Kenya Data Protection Act, 2019</li>
            <li>Computer Misuse and Cybercrimes Act</li>
            <li> CBK oversight principles for payment facilitation
            </li>

        </ul>

        <h3>Conclusion</h3>

        <p>TipMe does not require licensing as a Payment Service Provider at this stage, as it does not issue, store, or transfer electronic money independently.</p>
    </div>
    <div v-show="fundraising">
        <h1>FUNDRAISING DISCLAIMER</h1>
        <p>TipMe does not verify, endorse, or guarantee the legitimacy, accuracy, or purpose of any fundraising campaign hosted on the Platform.</p>
        <p>Users raising funds acknowledge that:</p>

        <ul>
            <li>All representations made are their sole responsibility</li>
            <li>Funds raised must be used for the stated purpose</li>
            <li>TipMe is not liable for misuse or misrepresentation of funds</li>
        </ul>

        <p>Supporters contribute at their own discretion and risk.</p>
        <p>TipMe reserves the right to suspend fundraising campaigns suspected of fraud, deception, or unlawful activity.</p>
    </div>
    <div v-show="restaurant_terms">
        <h1>RESTAURANT & SERVICE STAFF TERMS</h1>
        <p>These terms apply to restaurants, hospitality businesses, and service staff using TipMe for tipping.</p>
        <h3>A. Role of TipMe</h3>
        <p>TipMe provides a direct tipping mechanism between customers and service staff.</p>
        <h4>TipMe:</h4>

        <ul>
            <li>Does not employ service staff</li>
            <li>Does not manage tip distribution</li>
            <li>Does not arbitrate tip allocation disputes</li>
        </ul>
        <h3>B. Employer Responsibility</h3>
        <p>Restaurants remain solely responsible for:</p>
        <ul>
            <li>Staff employment contracts</li>
            <li>Tax obligations</li>
            <li>Compliance with labor laws</li>
        </ul>
        <p>TipMe does not assume employer obligations.</p>

        <h3>C. Tip Ownership</h3>
        <p>Tips received through TipMe are considered voluntary gratuities paid directly to the designated recipient.</p>
        <p>Management may not redirect or withhold tips without the recipient’s consent.</p>
        <ul>
            <li></li>
        </ul>
    </div>

</v-app>
</template>

<script>
export default {
    name: 'EmptyLayout',

    data() {
        return {
            title: "Terms & Conditions",
            terms: true,
            privacy: false,
            compliance: false,
            fundraising: false,
            restaurant_terms: false
        }
    },
    head() {

    }
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}

h3{
    color:#C6FF00;
}

.parallax {
    background-image: url('~/assets/more.svg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
