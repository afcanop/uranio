class Celda
{

    /**
     * @ORM\Id
     * @ORM\Column(name="codigo_celda_pk", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $codigoCeldaPk;

    /**
     * @ORM\Column(name="codigo_panal_fk", type="integer")
     */
    private $codigoPanalFk;

    /**
     * @ORM\Column(name="celda", type="string", length=20, nullable=true)
     */
    private $celda;

    /**
     * @ORM\Column(name="celular", type="string", length=100, nullable=true)
     */
    private $celular;

    /**
     * @ORM\Column(name="correo", type="string", length=150, nullable=true)
     */
    private $correo;

    /**
     * @ORM\Column(name="responsable", type="string", length=200, nullable=true)
     */
    private $responsable;

    /**
     * @ORM\Column(name="llave", type="string", length=200, nullable=true)
     */
    private $llave;

    /**
     * @ORM\Column(name="limitar_anuncio", type="boolean", options={"default" : false}, nullable=true)
     */
    private $limitarAnuncio = false;

    /**
     * @ORM\Column(name="coeficiente", type="float", options={"default" : 0})
     */
    private $coeficiente = 0.0;

    /**
     * @ORM\Column(name="area", type="float", options={"default" : 0})
     */
    private $area = 0.0;

    /**
     * @ORM\Column(name="codigo_externo", type="string", length=100, nullable=true)
     */
    private $codigoExterno;
