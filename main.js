// IFTTT Slottt Machine by Jen Hamon
// jen@ifttt.com
// github.com/jhamon
var wordlist = [
    'office',
    'official',
    'teamwork',
    'monitor',
    'schedule',
    'prepare',
    'track',
    'record',
    'remember',
    'make a note',
    'archive',
    'timeshift',
    'timeshift',
  ];

var msa = [
    { id: '1', name: "Abilene, TX" },
    { id: '2', name: "Akron, OH" },
    { id: '3', name: "Albany, GA" },
    { id: '4', name: "Albany, OR" },
    { id: '5', name: "Albany-Schenectady-Troy, NY" },
    { id: '6', name: "Albuquerque, NM" },
    { id: '7', name: "Alexandria, LA" },
    { id: '8', name: "Allentown-Bethlehem-Easton, PA-NJ" },
    { id: '9', name: "Altoona, PA" },
    { id: '10', name: "Amarillo, TX" },
    { id: '11', name: "Ames, IA" },
    { id: '12', name: "Anchorage, AK" },
    { id: '13', name: "Ann Arbor, MI" },
    { id: '14', name: "Anniston-Oxford-Jacksonville, AL" },
    { id: '15', name: "Appleton, WI" },
    { id: '16', name: "Asheville, NC" },
    { id: '17', name: "Athens-Clarke County, GA" },
    { id: '18', name: "Atlanta-Sandy Springs-Roswell, GA" },
    { id: '19', name: "Atlantic City-Hammonton, NJ" },
    { id: '20', name: "Auburn-Opelika, AL" },
    // { id: '', name: "Augusta-Richmond County, GA-SC" },
    // { id: '', name: "Austin-Round Rock, TX" },
    // { id: '', name: "Bakersfield, CA" },
    // { id: '', name: "Baltimore-Columbia-Towson, MD" },
    // { id: '', name: "Bangor, ME" },
    // { id: '', name: "Barnstable Town, MA" },
    // { id: '', name: "Baton Rouge, LA" },
    // { id: '', name: "Battle Creek, MI" },
    // { id: '', name: "Bay City, MI" },
    // { id: '', name: "Beaumont-Port Arthur, TX" },
    // { id: '', name: "Beckley, WV" },
    // { id: '', name: "Bellingham, WA" },
    // { id: '', name: "Bend-Redmond, OR" },
    // { id: '', name: "Billings, MT" },
    // { id: '', name: "Binghamton, NY" },
    // { id: '', name: "Birmingham-Hoover, AL" },
    // { id: '', name: "Bismarck, ND" },
    // { id: '', name: "Blacksburg-Christiansburg-Radford, VA" },
    // { id: '', name: "Bloomington, IL" },
    // { id: '', name: "Bloomington, IN" },
    // { id: '', name: "Bloomsburg-Berwick, PA" },
    // { id: '', name: "Boise City, ID" },
    // { id: '', name: "Boston-Cambridge-Newton, MA-NH" },
    // { id: '', name: "Boulder, CO" },
    // { id: '', name: "Bowling Green, KY" },
    // { id: '', name: "Bremerton-Silverdale, WA" },
    // { id: '', name: "Bridgeport-Stamford-Norwalk, CT" }
  ];
  
  let page = 1;


  function buildSlotItem (text) {
      return $('<div>').addClass('slottt-machine-recipe__item').text( text )
  }
  
  function buildSlotContents ($container, wordlist) {
    $items = wordlist.map(buildSlotItem);
    $container.append($items);
  }
  
  function popPushNItems ($container, n) {
      $children = $container.find('.slottt-machine-recipe__item');
      $children.slice(0, n).insertAfter($children.last());
  
      if (n === $children.length) {
        popPushNItems($container, 1);
      }
  }
  
  // After the slide animation is complete, we want to pop some items off
  // the front of the container and push them onto the end. This is
  // so the animation can slide upward infinitely without adding
  // inifinte div elements inside the container.
  function rotateContents ($container, n) {

      setTimeout(function () {
        popPushNItems($container, n);
        $container.css({top: 0});
      }, 300);    
  }
  



  function randomSlotttIndex(max) {
    var randIndex = (Math.random() * max | 0);
    return (randIndex > 10) ? randIndex : randomSlotttIndex(max);
  }
  
  let delay = 1200;
  let isStop = false;
    

  function animate() {

    var wordIndex = randomSlotttIndex(wordlist.length);
    return new Promise(function(resolve, reject) {

        let top = -wordIndex*slotHeight;
        $wordbox.animate({top: top}, delay, 'linear', function () {

            // rotateContents($wordbox, wordIndex);

            $wordbox.css({
                top: 0,
                transform: 'translateY('+ top +'px)'
            });

            if( isStop ){
              isStop = false;
              reject();
            }
            else{
              resolve();
            }
            
        });

    });
  }





  const slotHeight = $('.slottt-machine-recipe').outerHeight();

  
  

  $(function () {
    $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
    buildSlotContents($wordbox, wordlist);  
    buildSlotContents($wordbox, wordlist);  
    buildSlotContents($wordbox, wordlist);  
    buildSlotContents($wordbox, wordlist);
    buildSlotContents($wordbox, wordlist);
    buildSlotContents($wordbox, wordlist);


    $('#stop').prop('disabled', true);
    $('#start').click(function (e) { 
        e.preventDefault();

        var wordIndex = randomSlotttIndex(wordlist.length);
        rotateContents($wordbox, wordIndex);
        $wordbox.stop().css({
            top: '',
            transform: ''
        });
        
        animate().then( ()=>{
          // console.log( 'refresh' );

          $('#start').trigger('click');
        }, ()=>{

          // console.log( 'reject' );

          let wordIndex = randomSlotttIndex(wordlist.length);
          let top = parseInt($wordbox.css('top'));

          let index = parseInt( (top/slotHeight) );
          let indexTop = index * slotHeight;

          if( indexTop > top ){
            index--;
            indexTop = index * slotHeight
          }

          let a = 0, b = 0, c = 0, d = 0;

          function _delay( dl ) {
          
            $wordbox.animate({top: indexTop}, dl, 'linear', function () { // swing

              index--;
              indexTop = index * slotHeight

              if ( a!=1 ){
                _delay(100);
                a = Math.floor(Math.random()* 2)
              }
              else if( b != 1){
                _delay(200);
                b = Math.floor(Math.random()* 2)
              }
              else if( c != 1){
                _delay(300);
                c = Math.floor(Math.random()* 2)
              }
              else{

                if( Math.floor(Math.random()* 2)==0 ){
                  _delay(500);
                }else{

                  // return 
                  if( Math.floor(Math.random()* 2)==0 ){

                    h = (slotHeight*70) /100; // 70%
                    $wordbox.animate({top: indexTop-h}, 800, 'linear', function () { // swing
                      $wordbox.animate({top: indexTop}, 800, 'swing');
                      console.log('Done');
                    });
                  }
                  else{
                    console.log('Done');
                  }

                }
              }

            });
          }

          _delay(10);

          // $wordbox.stop()
        } );


        // v = setInterval(randomSlot, 200);

        $('#start').prop('disabled', true);
        $('#stop').prop('disabled', false);

    });



    $('#stop').click(function (e) { 
        e.preventDefault();
        
        isStop = true;
        $('#start').prop('disabled', false);
        $('#stop').prop('disabled', true);
    });


  });