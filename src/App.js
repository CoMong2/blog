/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// App도 컴포넌트.
function App() {
  
  /** 데이터바인딩은 {중괄호} */
  let post = '강남 우동 맛집';
  /** Destructuring 문법 */
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0,0,0]);
  
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputValue, setInputValue] = useState('');

  /** map() 사용법
   * 1. array 자료 갯수만큼 함수안의 코드 실행해줌
   * 2. 함수의 파라미터는 array안에 있던 자료임
   * 3. return에 뭐 적으면 array로 담아줌
   */

  /** 변수와 state의 차이점
   * - state는 변경이 되면 자동으로 '재랜더링'됨.
   * -> 자주변경될거같은 html은 state로 만들어놓기.
   */

  /** state 변경하는 법
   * 1. state 선언시, 2번째 변수 = state 변경용 함수
   *  -> html 재렌더링이 잘됨.
   */

  /** state변경함수 특징
   * 1. 기존 == 신규의 경우 : 변경x
   *  array/object 특징
   * 1. array/object 담은 변수엔 화살표(데이터 저장 주소)만 저장됨.
   */

  function change() {
    let copy = [...글제목];    //글제목state를 사용하면 '기존==신규'의 법칙이 적용됨.
    copy[0] = '여자코트 추천';
    글제목변경(copy);
  }

  const onDelete = (target) => {
    let data = [...글제목].filter((title) => title !== target);
    글제목변경(data);
  }

  const onCreate = (target) => {
    글제목변경(글제목.concat(target));
    따봉변경(따봉.concat(0));
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      

      {/* <button onClick ={() => {
        let copy = [...글제목];    //글제목state를 사용하면 '기존==신규'의 법칙이 적용됨.
        copy[0] = '여자코트 추천';
        글제목변경(copy);
      }}>글수정</button>

      <button onClick={() => {
        let copy = [...글제목];
        copy = copy.sort();
        글제목변경(copy);
      }}>
        정렬
      </button> */}

      {/* <div className="list">
        <h4>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉+1) } }> 👍 </span>{ 따봉 }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 18일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={() => {
          //modal == true ? setModal(false) : setModal(true)
          setModal(!modal)
        }}>{ 글제목[2] }</h4>
        <p>2월 19일 발행</p>
      </div>
      */}
      
      

      {
        글제목.map(function(title, index){
          return (
            <div className="list" key={index}>
              <h4 onClick={() => {
                //modal == true ? setModal(false) : setModal(true)
                setModal(!modal);
                setTitle(index);
              }}>{ 글제목[index] }
              <span onClick={ (e) => { 
                e.stopPropagation();
                let count = [...따봉];
                count[index] += 1;
                따봉변경(count);
              } }> 👍 { 따봉[index] }</span>
              <button onClick={(e) => {
                e.stopPropagation();
                onDelete(글제목[index]);
                //글제목 copy -> splice(index, 1)로 삭제
              }}>삭제
              </button>
              </h4>
              <p>2월 18일 발행</p>
            </div>
          )
        })
      }

      <input onChange={(e) => { 
        setInputValue(e.target.value); 
        console.log(inputValue) 
        }}></input>
      <button onClick={() => {
        // let title = [...글제목];
        // title[title.length] = inputValue;
        // 글제목변경(title);

        // let like = [...따봉];
        // like[like.length] = 0;
        // 따봉변경(like);

        onCreate(inputValue);
      }}>추가</button>

      {
        modal == true ? <Modal idx={ title } func={ change } 글제목={ 글제목 }/> : null
      } 

    </div>
  );
}

/** 동적인 UI 만드는 step
 * 1. html css로 미리 디자인완성
 * 2. UI의 현재 상태를 state로 저장
 * 3. state에 따라 UI가 어떻게 보일지 작성
 */

/** 컴포넌트 만드는 법
 * 1. function 만들고
 * 2. return()안에 html 담기
 * 3. <함수명></함수명> 쓰기
 * (참고) return()안에 html병렬기입 할려면 의미없는 <div> 대신 <></>을 사용.
 */

/** 어떤걸 컴포넌트로 만들면 좋은가
 * 1. 반복적인 html 축약할 때
 * 2. 큰 페이지들
 * 3. 자주변경되는 것들
 */

/** 컴포넌트의 단점
 * state 가져다쓸 때 문제점
 */

/** 부모 -> 자식 state 전송하는법
 * 1. <자식컴포넌트 작명={state이름}>
 * 2. props파라미터 등록 후 props.작명 사용
 * (참고)부모 -> 자식만 가능
 */

function Modal(props){
  return (
      <div className="modal">
        <h4>{ props.글제목[props.idx] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={() => {props.func()}}>글수정</button>
      </div>
  )
}

export default App;
