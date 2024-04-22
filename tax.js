let form = document.getElementById('form')

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let basic = document.getElementById('basic').value
    let benefits = document.getElementById('benefits').value
    if (basic == '' || benefits == '') {
        document.getElementById('gross').value = "INPUT ERROR"
    }
    else {

        function calc_gross(a, b) {
            let gross = a + b
            return gross
        }
        let gr_sal = calc_gross(Number(basic), Number(benefits))
        document.getElementById('gross').innerHTML = `  KES.${gr_sal}`

        //NHIF
        function calc_nhif(a){
            let nhif = 0
            if (a >= 0 && a < 6000) {
                nhif = 150
            }
            else if (a >= 6000 && a < 8000) {
                nhif = 300
            }
            else if (a >= 8000 && a < 12000) {
                nhif = 400
            }
            else if (a >= 12000 && a < 15000) {
                nhif = 500
            }
            else if (a >= 15000 && a < 20000) {
                nhif = 600
            }
            else if (a >= 20000 && a < 25000) {
                nhif = 750
            }
            else if (a >= 25000 && a < 30000) {
                nhif = 850
            }
            else if (a >= 30000 && a < 35000) {
                nhif = 900
            }
            else if (a >= 35000 && a < 40000) {
                nhif= 950
            }
            else if (a >= 40000 && a < 45000) {
                nhif = 1000
            }
            else if (a >= 45000 && a < 50000) {
                nhif = 1100
            }
            else if (a >= 50000 && a < 60000) {
                nhif = 1200
            }
            else if (a >= 60000 && a < 70000) {
                nhif = 1300
            }
            else if (a >= 70000 && a < 80000) {
                nhif = 1400
            }
            else if (a >= 80000 && a < 90000) {
                nhif = 1500
            }
            else if (a >= 90000 && a < 10000) {
                nhif = 1600
            }
            else {
                nhif = 1700
            }
            return nhif
        }
        let nh = calc_nhif(gr_sal)
        document.getElementById('nhif').innerHTML = `KES.${nh}`

        //NSSF
        function my_nssf(x, y = 0.06) {
            let nssf = 0
            if (x <= 18000) {
                nssf = x * y
            }
            else {
                nssf = 18000 * 0.06
            }
            return nssf
        }
        let nssf_c = my_nssf(gr_sal)
        document.getElementById('nssf').innerHTML = `KES.${nssf_c}`

        //NHDF
        function my_nhdf(x, y = 0.015) {
            let nh = x * y
            return nh
        }
        let nhdf = my_nhdf(gr_sal)
        document.getElementById('nhdf').innerHTML = `KES. ${nhdf}`


        //TAXABLE
        function taxable_income(a, b, c) {
            let tax = a - (b + c)
            return tax
        }
        let taxable = taxable_income(gr_sal, nssf_c, nhdf)
        document.getElementById('taxable').innerHTML = `KES. ${taxable}`
        
        //PAYEE
        function my_payee(inc) {
            let relief = 2400
            let pay = 0

            if (inc >= 0 && inc <= 24000) {
                pay = 0
            }
            else if (inc > 24000 && inc <= 32333) {
                pay = ((inc - 24000) * 0.25) + (0.1 * 24000) - relief
        
            }
            else if (inc > 32333 && inc <= 500000) {
                pay= (8333 * 0.25) + (0.1 * 24000) + ((inc - 32333) * 0.3) - relief
            }
            else if (inc > 500000 && inc <= 800000) {
                pay = (8333 * 0.25) + (0.1 * 24000) + (467667 * 0.3) + ((inc - 500000) * 0.325) - relief
            }
            else {
                pay = (8333 * 0.25) + (0.1 * 24000) + (8333 * 0.3) + (467667 * 0.325) + (300000 * 0.325) + ((inc - 800000) * 0.35) - relief
            }
            return pay
        }
        let payee = my_payee(taxable)
        document.getElementById('payee').innerHTML = `KES.${Math.round(payee)}`
        
        //NET SAL
        function net_salary(a, b, c, d, e) {
            let net_s = a - (b + c + d + e)
            return net_s
        }
        let net = net_salary(gr_sal, nh, nhdf, nssf_c, payee)
        document.getElementById('net').innerHTML = `KES.${net}`
        
    }


})