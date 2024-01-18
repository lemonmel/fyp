import { auth } from '../database/firebase.js';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export async function generatePDF(result, localUri) {

    const date = result.date
    const FS = result.FS
    const status = result.status.charAt(0).toUpperCase() + result.status.slice(1)
    const nh_range = result.nh_range

    const base64Image = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
        table {
        border-collapse: collapse;
        width: 100%;
        }
        td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        }
        .center {
            text-align: center
        }
        </style>
    </head>
    <body style="font-family: Helvetica Neue; padding: 40px">
        <h2 class="center"> Frequency Selectivity Screening Result</h2>
        <table>
        <tr>
            <td>Email</td>
            <td>${auth.currentUser.email}</td>
        </tr>
        <tr>
            <td>Date of Test</td>
            <td>${date}</td>
        </tr>
        <tr>
            <td>Overall Result</td>
            <td>${status}</td>
        </tr>
        </table>
        <div class="center">
            <img src="data:image/png;base64,${base64Image}" width="70%"  />
        </div>
        <br/>
        <table>
        <tr>
            <th>Frequency</th>
            <th>FS Reading</th>
            <th>Status</th>
        </tr>
`

    Object.keys(FS).forEach((key, index) => {
        let value = FS[key]
        let normality = 'Normal'
        if(value > nh_range[key].max || value < nh_range[key].min){
            normality = 'Abnormal'
        }
        html +=
        `<tr>
        <td>`+key+`</td>
        <td>`+value.toFixed(2)+`</td>
        <td>`+normality+`</td>
        </tr>`
    })
    
    html = html + 
    `</table>
    </body>
    </html>
    `

    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
}

