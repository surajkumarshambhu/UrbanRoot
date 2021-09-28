import * as CONSTANT from '../Helper/Constant';

export function ApiHelper(url, data = {}, method = 'GET') {
    let bearer = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTYxODc4MjBmODA2ODk2MDg4MjNkNjZjZTNhNzM4NmRlNGMwOTE3MGJkYTM5ZmZjNjAzNzE2MzZjZTY2MDgwMDJlZTNkNDM3NjE2ZjllMTgiLCJpYXQiOjE2MzI4NDA2NTYsIm5iZiI6MTYzMjg0MDY1NiwiZXhwIjoxNjY0Mzc2NjU2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.X6cmzDCTDWTh6tYQDDez7tSVzc_uW687FAzzABaMgVpcU9gU2Co-qccEdbs0wteq7ucH_6un4U4GrnQ8WxKKY4AVHYoz3GpZs_2jsnLXs026D0BVPz_mAkd7Norw_B63ktyd1c4iyjrE93Fh1hU7oROo3-aosxzye6745P-SfaoG3c3-STSpAmtiqVeicEyWZgWVWovflUfPPChX9t84qDTlKtQav9u_7UVQbD_enAFuRyNHjmWu0SWv6zj_4PagmApLoSwSSnzCQ5Sw85EI2HAIecbhNgtkLtksXzy6FHq8r5uKpOLE2x4eA1JHtqChV9Vxk8WZyF5k3zdKmBGFJ0OKHsytG1drfFpLyow2ZbSICkM47q9GR1xhTfiwbZviMQ8HsC0Ooi9NU0g5orcXg2seFzXctbA8TulqE386RbG_IFlm9FvcU39uFeuOB0Fr8EWzwlR0q2S1xuBsVFNIsl-Pr-VMGPZPfQqw4w0sQV5ZOHX91N6xSozRednP_ucnVXGJrmPO_Y68n1iSYG06q-vZjhN9IL8eAbnEmuWq8XnQUPKbkDNHNuqIgb-0Na2Rab1ci6hsgVYh44RRalxDp4vwEztAp7IThyviOm6Vflq2knJ_5p6xHgqYsOedg2SB7F7UHcWYbJpgaC6G8ZTKv--OUGGu3EuFZkv_Oyi1rZo' ;
    return fetch(CONSTANT.BASEURL+url, {  // Return promise
        method: method,
        withCredentials: true,
        // credentials: 'include',
        headers: {
            'AcceptLanguage': 'en_US',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'clientVersion': 'WEB:1',
            'Authorization': bearer,
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        return result;
    }, (error) => {
        error = error;
    })
}
