import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='bg-cyan-800 text-white text-center'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg="6" md="12" className='mb-4 mb-md-0 leading-10'>
            <h5 className='text-uppercase text-blue-200'>Caption</h5>

            <p>
              Hãy tin vào đôi mắt của chúng tôi!
            </p>
            <p>AMARA ! Tạo nên phong cách  của bạn!</p>
          </MDBCol>

          <MDBCol lg="3" md="6" className='mb-4 mb-md-0'>
            <h5 className='text-uppercase text-blue-200'>Về AMARA</h5>

            <ul className='list-unstyled mb-0 leading-10'>
              <li>
                <a href='#!' className='text-white'>
                Trang chủ
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                Giới thiệu
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                 Trợ giúp
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg="3" md="6" className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0 text-blue-200'>Về Sản Phẩm</h5>

            <ul className='list-unstyled leading-10'>
              <li>
                <a href='#!' className='text-white'>
                Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                Giao hàng & Nhận hàng
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 :
        <a className='text-white' href='#'>
          AMARA.com
        </a>
      </div>
    </MDBFooter>
  )
}
