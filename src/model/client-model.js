import Axios from 'axios';

export function callCommon(transId, data, file) {
  let fileData = new FormData();
  fileData.append('_fw_service_id', 'wbSimpleTransaction');
  fileData.append('transaction_id', transId);
  if(file) {
    fileData.append('savePath', 'microapp/icon');
    fileData.append('transFlag', 'P8_RP');
    fileData.append('remotePath', '/home/ap/share/file/input/filesystem/forever/eip/icon');
    fileData.append('saveFileName', data.picNm);
    fileData.append('upload', file)
  }
  fileData.append('jsonData', JSON.stringify(data));
  return Axios({
    method: 'post',
    url: '/ecpJson.action',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    withCredentials: true,
    data: fileData
  }).then(d => {
    if(d && d.data && d.data.BK_STATUS==="00") {
      return Promise.resolve(d.data);
    }
    return Promise.reject(d || d.data || d.data.BK_DESC);
  })
}
