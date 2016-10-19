Rails.configuration.stripe = {
    :publishable_key => 'pk_test_GJir9E2r13I8N55l0r7E3iya',
    :secret_key      => 'sk_test_wjUc4sTasr5LRRIDCkkO9e2j'
}

Stripe.api_key = Rails.configuration.stripe[:secret_key]