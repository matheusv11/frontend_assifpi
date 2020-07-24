import React from 'react';

const Modal = ({children})=>{
    return (

  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Confirmar ação</h4>
        </div>
        <div class="modal-body">
          <p>Deseja mesmo realizar esta ação?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">SIM</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">NÃO</button>
        </div>
      </div>
      
    </div>
  </div>
  
    
    )
}

export default Modal;